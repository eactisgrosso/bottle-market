import { Inject, Injectable } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { createProductSamples } from "./product.sample";
import ProductDTO, { ProductResponse } from "./product.dto";
import { filterItems, getRelatedItems } from "../../helpers/filter";
import { ProductType } from "./product.enum";
import Category from "../category/category.type";

@Injectable()
@Resolver()
export class ProductResolver {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  private readonly items: ProductDTO[] = createProductSamples();

  private queryByCategorySlug = async (query: any, category: string) => {
    if (!category) return;

    const childrenCategories = await this.knex("marketplace_category_tree_view")
      .select("slug")
      .where("path", "like", `%[catalogo-publico]%`)
      .andWhere("path", "like", `%[${category}]%`);

    if (childrenCategories && childrenCategories.length > 0) {
      query.andWhere((builder: any) => {
        for (let childrenCategory of childrenCategories) {
          builder.orWhere(
            "categoriesSlugs",
            "like",
            `%[${childrenCategory.slug}]%`
          );
        }
      });
    }
  };

  private queryByText = async (query: any, text: string) => {
    if (!text) return;

    const terms = text.split(" ");
    query.andWhere((builder: any) => {
      for (let term of terms) {
        builder.andWhere((innerBuilder: any) => {
          innerBuilder
            .where("title", "like", `%${term}%`)
            .orWhere("producer", "like", `%${term}%`)
            .orWhere("region", "like", `%${term}%`)
            .orWhere("description", "like", `%${term}%`);
        });
      }
    });
  };

  @Query((returns) => ProductResponse)
  async products(
    @Args("limit", { type: () => Int, defaultValue: 10 }) limit: number,
    @Args("offset", { type: () => Int, defaultValue: 0 }) offset: number,
    @Args("type", { nullable: true }) type?: string,
    @Args("text", { nullable: true }) text?: string,
    @Args("category", { nullable: true }) category?: string
  ) {
    let categoryIds = new Set();

    const query = this.knex("marketplace_product_view as p").select("*");
    let queryCount = this.knex("marketplace_product_view as p").count(
      "id as count"
    );

    if (category) {
      await this.queryByCategorySlug(query, category);
      await this.queryByCategorySlug(queryCount, category);
    } else if (type) {
      await this.queryByCategorySlug(query, type);
      await this.queryByCategorySlug(queryCount, type);
    }

    if (text) {
      await this.queryByText(query, text);
      await this.queryByText(queryCount, text);
    }

    const dbProducts = await query
      .limit(limit)
      .offset(offset)
      .map(function (dbProduct: any) {
        let product = new ProductDTO();
        Object.keys(dbProduct).forEach(
          (key) => ((product as any)[key] = dbProduct[key])
        );
        product.image = `https://bottlemarket.s3.amazonaws.com/${dbProduct.image}`;
        product.unit = `${dbProduct.units} unidad(es)`;
        product.salePrice = 0;
        product.type = ProductType.WINE;
        product.gallery = [];
        product.categories = [];

        let dbCategoryIds = dbProduct.categories.split(",");
        for (let categoryId of dbCategoryIds) {
          let category = new Category();
          category.id = +categoryId;
          categoryIds.add(category.id);
          product.categories.push(category);
        }

        return product;
      });

    const dbCategories = await this.knex("marketplace_category")
      .select("*")
      .whereIn("id", [...categoryIds]);

    let categories = Object.assign(
      {},
      ...dbCategories.map((x: any) => ({ [x.id]: x }))
    );

    for (let dbProduct of dbProducts)
      for (let category of dbProduct.categories) {
        let dbCategory = categories[category.id];
        category.title = dbCategory.title;
        category.slug = dbCategory.slug;
        category.icon = "FruitsVegetable";
        category.type = "wine";
        category.children = [];
      }

    const dbTotal = await queryCount;
    return new ProductResponse({
      total: dbTotal[0].count,
      items: dbProducts,
      hasMore: offset + limit < dbTotal[0].count,
    });
  }

  @Query((returns) => ProductDTO)
  async product(@Args("slug", { type: () => String }) slug: string) {
    return await this.items.find((item) => item.slug === slug);
  }

  @Query(() => [ProductDTO], { description: "Get the Related products" })
  async relatedProducts(
    @Args("slug", { type: () => String }) slug: string,
    @Args("type", { nullable: true }) type?: string
  ): Promise<any> {
    const relatedItem = await getRelatedItems(type, slug, this.items);
    return relatedItem;
  }
}

import { Inject, Injectable } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import ProductDTO, { ProductResponse } from "./product.dto";
import { ProductType } from "./product.enum";
import Category from "../category/category.type";
import Gallery from "./gallery.type";

@Injectable()
@Resolver()
export class ProductResolver {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

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

  private mapProduct = async (dbProduct: any, product: ProductDTO) => {
    Object.keys(dbProduct).forEach(
      (key) => ((product as any)[key] = dbProduct[key])
    );

    product.gallery = [];
    product.image = "";
    if (dbProduct.images) {
      const images = dbProduct.images.split(",");
      for (let image of images) {
        const gallery = new Gallery();
        gallery.url = `https://bottlemarket.s3.amazonaws.com/${image}`;
        product.gallery.push(gallery);
      }
      product.image = product.gallery[0].url;
    }
    product.unit = `${dbProduct.units} unidad(es)`;
    product.salePrice = 0;
    product.categories = [];

    return product;
  };

  private buildCategoryMap = async (categoryIds: Set<number>) => {
    const dbCategories = await this.knex(
      "marketplace_category_tree_view"
    ).whereIn("id", [...categoryIds]);

    return Object.assign({}, ...dbCategories.map((x: any) => ({ [x.id]: x })));
  };

  @Query((returns) => ProductResponse)
  async products(
    @Args("limit", { type: () => Int, defaultValue: 10 }) limit: number,
    @Args("offset", { type: () => Int, defaultValue: 0 }) offset: number,
    @Args("type", { nullable: true }) type?: string,
    @Args("text", { nullable: true }) text?: string,
    @Args("category", { nullable: true }) category?: string
  ) {
    let categoryIds = new Set<number>();

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
      .map((dbProduct: any) => {
        const product = new ProductDTO();
        this.mapProduct(dbProduct, product);

        product.type = (<any>ProductType)[
          type != null ? type : ProductType.vino
        ];

        let dbCategoryIds = dbProduct.categories.split(",");
        for (let categoryId of dbCategoryIds) {
          let category = new Category();
          category.id = +categoryId;
          categoryIds.add(category.id);
          product.categories.push(category);
        }

        return product;
      });

    let categories = await this.buildCategoryMap(categoryIds);

    for (let dbProduct of dbProducts)
      for (let category of dbProduct.categories) {
        let dbCategory = categories[category.id];
        category.title = dbCategory.title;
        category.slug = dbCategory.slug;
        category.icon = "FruitsVegetable";
        category.type = (<any>ProductType)[
          type != null ? type : ProductType.vino
        ];
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
    let categoryIds = new Set<number>();

    const dbProduct = await this.knex("marketplace_product_view as p")
      .first("*")
      .where("slug", slug);

    const product = new ProductDTO();
    this.mapProduct(dbProduct, product);

    let dbCategoryIds = dbProduct.categories.split(",");
    for (let categoryId of dbCategoryIds) {
      let category = new Category();
      category.id = +categoryId;
      categoryIds.add(category.id);
      product.categories.push(category);
    }

    const type = await this.knex("marketplace_category_parent as mkp")
      .first("mct.slug")
      .join(
        "marketplace_category_tree_view as mct",
        "mkp.to_category_id",
        "mct.id"
      )
      .whereIn("from_category_id", [...categoryIds])
      .andWhere("mct.path", "like", "%[catalogo-publico]%");
    product.type = type;

    let categories = await this.buildCategoryMap(categoryIds);
    for (let category of product.categories) {
      let dbCategory = categories[category.id];
      category.title = dbCategory.title;
      category.slug = dbCategory.slug;
      category.type = type;
      category.icon = "FruitsVegetable";
      category.children = [];
    }

    return product;
  }

  @Query(() => [ProductDTO], { description: "Get the Related products" })
  async relatedProducts(
    @Args("slug", { type: () => String }) slug: string,
    @Args("type", { nullable: true }) type?: string
  ): Promise<any> {
    return null;
  }
}

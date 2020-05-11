import { Inject, Injectable } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import loadProducts from "../../data/product.data";
import ProductDTO from "./product.type";
import Products from "./products.type";
import GetProductsArgs from "./product.args_type";
import AddProductInput from "./product.input_type";
import { ProductType } from "../../../common/data/product.enum";
import ProductQuery from "../../../common/data/product.query";
import search from "../../helpers/search";
import shuffle from "../../helpers/shuffle";
import { sortByHighestNumber, sortByLowestNumber } from "../../helpers/sorts";

@Injectable()
@Resolver()
export default class ProductResolver {
  private productQuery: ProductQuery;

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {
    this.productQuery = new ProductQuery(knex);
  }

  private readonly productsCollection: ProductDTO[] = loadProducts();

  @Query((returns) => Products, { description: "Get all the products" })
  async products(
    @Args()
    { limit, offset, sortByPrice, type, searchText, category }: GetProductsArgs
  ): Promise<Products> {
    const query = this.knex("marketplace_product_view as p").select("*");
    const queryCount = this.knex("marketplace_product_view as p").count(
      "id as count"
    );

    if (category) {
      await this.productQuery.byCategorySlug(query, category);
      await this.productQuery.byCategorySlug(queryCount, category);
    } else if (type) {
      await this.productQuery.byCategorySlug(query, type);
      await this.productQuery.byCategorySlug(queryCount, type);
    }

    if (searchText) {
      await this.productQuery.byText(query, searchText);
      await this.productQuery.byText(queryCount, searchText);
    }

    if (sortByPrice) await this.productQuery.sortByPrice(query, sortByPrice);

    const dbProducts = await query
      .limit(limit)
      .offset(offset)
      .map((dbProduct: any) => {
        const product = new ProductDTO();
        Object.keys(dbProduct).forEach(
          (key) => ((product as any)[key] = dbProduct[key])
        );

        product.name = dbProduct.title;
        product.image = "";
        if (dbProduct.images) {
          const images = dbProduct.images.split(",");
          if (images.length > 0)
            product.image = `https://s3.amazonaws.com/bottlemarket.images/${images[0]}`;
        }
        product.unit = `${dbProduct.units} unidad(es)`;
        product.salePrice = 0;
        product.categories = [];
        product.type = (<any>ProductType)[
          type != null ? type : ProductType.vino
        ];

        return product;
      });

    const dbTotal = await queryCount;

    return {
      items: dbProducts,
      totalCount: dbTotal[0].count,
      hasMore: offset + limit < dbTotal[0].count,
    };
  }

  @Query(() => ProductDTO)
  async product(@Args("slug") slug: string): Promise<ProductDTO | undefined> {
    return await this.productsCollection.find((item) => item.slug === slug);
  }

  @Mutation(() => ProductDTO, { description: "Create Category" })
  async createProduct(
    @Args("product") product: AddProductInput
  ): Promise<ProductDTO> {
    console.log(product, "product");

    return await product;
  }
}

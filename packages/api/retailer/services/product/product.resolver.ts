import { Inject, Injectable } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { Args, Int, Query, Resolver } from "@nestjs/graphql";

import ProductDTO from "./product.type";
import Products from "./products.type";
import ProductQuery from "../../../common/data/product.query";

@Injectable()
@Resolver()
export class ProductResolver {
  private productQuery: ProductQuery;

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {
    this.productQuery = new ProductQuery(knex);
  }

  private async mapProduct(dbProduct: any, product: ProductDTO) {
    Object.keys(dbProduct).forEach(
      (key) => ((product as any)[key] = dbProduct[key])
    );

    product.image = "";
    if (dbProduct.images)
      product.image = `https://s3.amazonaws.com/bottlemarket.images/${
        dbProduct.images.split(",")[0]
      }`;

    product.size = dbProduct.size;
    product.salePrice = 0;
    product.categories = [];

    return product;
  }

  @Query((returns) => Products, { description: "Get all the products" })
  async products(@Args("storeId", { type: () => String }) storeId: string) {
    const query = this.knex("marketplace_store_product_size_view")
      .select("*")
      .where("store_id", storeId);
    const dbProducts = await query.map((dbProduct: any) => {
      const product = new ProductDTO();
      this.mapProduct(dbProduct, product);
      product.discountInPercent = 0;

      return product;
    });

    return {
      items: dbProducts,
      totalCount: dbProducts.length,
      hasMore: false,
    };
  }
}

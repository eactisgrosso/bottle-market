import { Inject, Injectable } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { Args, Int, Query, Resolver } from "@nestjs/graphql";

import { UseGuards } from "@nestjs/common";
import { GraphqlAuthGuard } from "../../../common/auth/graphql.auth.guard";
import { User } from "../../../common/auth/user.decorator";

import ProductDTO from "./product.type";
import Products from "./products.type";
import GetProductsArgs from "./product.args_type";
import ProductQuery from "../../../common/data/product.query";
import { ProductType } from "../../../common/data/product.enum";

@Injectable()
@Resolver()
export class ProductResolver {
  private productQuery: ProductQuery;

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {
    this.productQuery = new ProductQuery(knex);
  }

  @Query((returns) => Products, { description: "Get all the products" })
  async products(
    @Args()
    { store_id, limit, offset, type, searchText, category }: GetProductsArgs
  ): Promise<Products> {
    const query = this.productQuery.select(
      "retailer_product_view as p",
      this.knex.raw("COALESCE(sp.quantity,0) as quantity")
    );

    query.leftJoin("store_product as sp", "p.id", "sp.product_size_id");

    if (category) await this.productQuery.byCategorySlug(query, category);
    else if (type) await this.productQuery.byCategorySlug(query, type);

    if (searchText) this.productQuery.byText(query, searchText);

    query.andWhere((builder: any) => {
      builder.andWhere((innerBuilder: any) => {
        innerBuilder
          .whereNull("sp.store_id")
          .orWhere("sp.store_id", "=", store_id);
      });
    });

    const dbProducts = await query
      .limit(limit)
      .offset(offset)
      .map((dbProduct: any) => {
        const product = new ProductDTO();
        Object.keys(dbProduct).forEach(
          (key) => ((product as any)[key] = dbProduct[key])
        );

        product.image = "";
        if (dbProduct.images && dbProduct.images.length > 0) {
          product.image = `https://s3.amazonaws.com/bottlemarket.images/${dbProduct.images[0]}`;
        }
        product.size = dbProduct.size;
        product.priceRetail = 0;
        product.discountInPercent = 0;
        product.categories = [];
        product.type = (<any>ProductType)[
          type != null ? type : ProductType.vino
        ];

        return product;
      });

    const count = dbProducts.length > 0 ? dbProducts[0].count : 0;

    return {
      items: dbProducts,
      totalCount: count,
      hasMore: offset + limit < count,
    };
  }
}

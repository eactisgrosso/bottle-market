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
    { storeId, limit, offset, type, searchText, category }: GetProductsArgs
  ): Promise<Products> {
    const query = this.productQuery.create();
    const queryCount = this.productQuery.createCount();

    query.leftJoin("product_size as ps", "p.id", "ps.product_id");

    if (category) {
      await this.productQuery.byCategorySlug(query, category);
      await this.productQuery.byCategorySlug(queryCount, category);
    } else if (type) {
      await this.productQuery.byCategorySlug(query, type);
      await this.productQuery.byCategorySlug(queryCount, type);
    }

    if (searchText) {
      this.productQuery.byText(query, searchText);
      this.productQuery.byText(queryCount, searchText);
    }

    const subQuery = this.knex("store_product")
      .select("product_size_id")
      .where("store_id", this.knex.raw("UUID_TO_BIN(?)", storeId));
    query.whereNotIn("ps.id", subQuery);

    const dbProducts = await query
      .limit(limit)
      .offset(offset)
      .map((dbProduct: any) => {
        const product = new ProductDTO();
        Object.keys(dbProduct).forEach(
          (key) => ((product as any)[key] = dbProduct[key])
        );

        product.image = "";
        if (dbProduct.images) {
          const images = dbProduct.images.split(",");
          if (images.length > 0)
            product.image = `https://s3.amazonaws.com/bottlemarket.images/${images[0]}`;
        }
        product.unit = `${dbProduct.units} unidad(es)`;
        product.size = dbProduct.size;
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
}

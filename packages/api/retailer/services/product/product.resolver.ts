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

  @UseGuards(GraphqlAuthGuard)
  @Query((returns) => Products, { description: "Get the store products" })
  async storeProducts(
    @User() user: any,
    @Args()
    { limit, offset, sortByPrice, type, searchText, category }: GetProductsArgs
  ): Promise<Products> {
    const userId = this.knex.raw("UUID_TO_BIN(?)", user.id);
    const storeId = this.knex.raw("BIN_TO_UUID(ms.id)");
    const query = this.knex("marketplace_store_product_size_view as msp")
      .select("msp.*")
      .join("marketplace_store as ms", "msp.store_id", storeId)
      .where("ms.user_id", userId);

    const dbProducts = await query.map((dbProduct: any) => {
      const product = new ProductDTO();
      this.mapProduct(dbProduct, product);
      product.discountInPercent = 0;
      product.type = (<any>ProductType)[type != null ? type : ProductType.vino];

      return product;
    });

    return {
      items: dbProducts,
      totalCount: dbProducts.length,
      hasMore: false,
    };
  }
}

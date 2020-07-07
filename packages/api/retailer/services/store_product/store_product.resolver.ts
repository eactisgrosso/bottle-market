import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { Inject, Injectable } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { UseGuards } from "@nestjs/common";
import { GraphqlAuthGuard } from "../../../common/auth/graphql.auth.guard";
import { ProductType } from "../../../common/data/product.enum";
import ProductQuery from "../../../common/data/product.query";
import { StoreProductRepository } from "../../domain/repositories/store_product.repository";
import {
  GetProductsArgs,
  StoreProductDTO,
  StoreProducts,
  ChangeProductAvailability,
} from "./store_product.types";

const { v4: uuidv4 } = require("uuid");

@Injectable()
@Resolver()
export class StoreProductResolver {
  private productQuery: ProductQuery;

  constructor(
    private repository: StoreProductRepository,
    @Inject(KNEX_CONNECTION) private readonly knex: any
  ) {
    this.productQuery = new ProductQuery(knex);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query((returns) => StoreProducts, {
    description: "Get all the products with the store ones toggled",
  })
  async storeProducts(
    @Args()
    { limit, offset, store_id, type, searchText, category }: GetProductsArgs
  ): Promise<StoreProducts> {
    const query = this.productQuery.select("retailer_product_view as p");

    if (category) await this.productQuery.byCategorySlug(query, category);
    else if (type) await this.productQuery.byCategorySlug(query, type);

    if (searchText) this.productQuery.byText(query, searchText);

    query.andWhere((builder: any) => {
      builder.andWhere((innerBuilder: any) => {
        innerBuilder.whereNull("store_id").orWhere("store_id", "=", store_id);
      });
    });

    const dbProducts = await query
      .limit(limit)
      .offset(offset)
      .map((dbProduct: any) => {
        const product = new StoreProductDTO();
        Object.keys(dbProduct).forEach(
          (key) => ((product as any)[key] = dbProduct[key])
        );

        product.image = "";
        if (dbProduct.images && dbProduct.images.length > 0) {
          product.image = `https://s3.amazonaws.com/bottlemarket.images/${dbProduct.images[0]}`;
        }
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

  @Mutation(() => StoreProductDTO, {
    description: "Change availability of a given product within the store",
  })
  async changeProductAvailability(
    @Args("availabilityInput") availabilityInput: ChangeProductAvailability
  ): Promise<StoreProductDTO> {
    const store_product_id =
      availabilityInput.id != availabilityInput.product_size_id
        ? availabilityInput.id
        : uuidv4();
    const storeProduct = await this.repository.load(store_product_id);

    storeProduct.changeAvailability(
      availabilityInput.store_id,
      availabilityInput.product_size_id,
      availabilityInput.price,
      availabilityInput.quantity
    );
    storeProduct.commit();

    let dto = new StoreProductDTO();
    Object.keys(storeProduct).forEach(
      (key) => ((dto as StoreProductDTO)[key] = storeProduct[key])
    );

    return dto;
  }
}

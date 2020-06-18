import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { Inject, Injectable, HttpService } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { UseGuards } from "@nestjs/common";
import { GraphqlAuthGuard } from "../../../common/auth/graphql.auth.guard";
import { User } from "../../../common/auth/user.decorator";
import ProductQuery from "../../../common/data/product.query";
import { StoreRepository } from "../../domain/repositories/store.repository";
import StoreDTO from "./store.type";
import AddStoreInput from "./store.input_type";
import { ProductType } from "../../../common/data/product.enum";
import StoreProductDTO from "./store.product_type";
import StoreProducts from "./store.products_type";
import {
  AddStoreProduct,
  ChangeProductQuantities,
} from "./store.product.input_type";
import GetProductsArgs from "../product/product.args_type";

const { v4: uuidv4 } = require("uuid");

@Injectable()
@Resolver()
export class StoreResolver {
  private productQuery: ProductQuery;

  constructor(
    private repository: StoreRepository,
    @Inject(KNEX_CONNECTION) private readonly knex: any,
    private httpService: HttpService
  ) {
    this.productQuery = new ProductQuery(knex);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [StoreDTO])
  async stores(@User() user: any): Promise<StoreDTO[]> {
    const dbStores = await this.knex("store_view")
      .select("*")
      .where("user_id", user.id);

    return dbStores;
  }

  @Mutation(() => StoreDTO, { description: "Create Store" })
  async createStore(
    @Args("storeInput") storeInput: AddStoreInput
  ): Promise<StoreDTO> {
    const store_id = uuidv4();
    const store = await this.repository.load(store_id);
    store.open(
      storeInput.name,
      storeInput.store_type,
      storeInput.state_id,
      storeInput.state,
      storeInput.city_id,
      storeInput.city,
      storeInput.street
    );
    store.commit();

    let dto = new StoreDTO();
    Object.keys(store).forEach((key) => ((dto as StoreDTO)[key] = store[key]));
    dto.delivery_areas = 0;
    dto.products = 0;

    return dto;
  }

  @Mutation(() => String)
  async deleteStore(@Args("id") id: string): Promise<string> {
    const store = await this.repository.load(id);
    store.close();
    store.commit();

    return id;
  }

  private async mapProduct(dbProduct: any, product: StoreProductDTO) {
    Object.keys(dbProduct).forEach(
      (key) => ((product as any)[key] = dbProduct[key])
    );

    product.image = "";
    if (dbProduct.images && dbProduct.images.length > 0)
      product.image = `https://s3.amazonaws.com/bottlemarket.images/${dbProduct.images[0]}`;

    product.size = `${dbProduct.size} ml`;
    product.priceRetail = dbProduct.price_retail;

    return product;
  }

  @UseGuards(GraphqlAuthGuard)
  @Query((returns) => StoreProducts, { description: "Get the store products" })
  async storeProducts(
    @Args()
    { limit, offset, store_id, type, searchText, category }: GetProductsArgs
  ): Promise<StoreProducts> {
    const query = this.productQuery.select("store_product_view as p");
    const queryCount = this.productQuery.selectCount("store_product_view as p");

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

    query.where("p.store_id", store_id);
    queryCount.where("p.store_id", store_id);

    const dbProducts = await query.map((dbProduct: any) => {
      const product = new StoreProductDTO();
      this.mapProduct(dbProduct, product);
      product.discountInPercent = 0;
      product.type = (<any>ProductType)[type != null ? type : ProductType.vino];

      return product;
    });

    const dbTotal = await queryCount;

    return {
      items: dbProducts,
      totalCount: dbTotal[0].count,
      hasMore: offset + limit < dbTotal[0].count,
    };
  }

  @Mutation(() => StoreProductDTO, { description: "Add product to store" })
  async addProductToStore(
    @Args("productInput") productInput: AddStoreProduct
  ): Promise<StoreProductDTO> {
    const store = await this.repository.load(productInput.store_id);
    store.addProduct(productInput.product_size_id, productInput.price);
    store.commit();

    const response = new StoreProductDTO();
    response.id = productInput.product_size_id;
    const productInfo = store.products.get(productInput.product_size_id);
    response.price = productInfo ? productInfo.price : 0;
    response.quantity = productInfo ? productInfo.quantity : 0;

    return response;
  }

  @Mutation(() => Boolean, {
    description: "Increment product quantity",
  })
  async changeProductQuantities(
    @Args("productInput") productInput: ChangeProductQuantities
  ) {
    const store = await this.repository.load(productInput.store_id);
    store.changeProductQuantities(productInput.quantities);
    store.commit();

    return true;
  }
}

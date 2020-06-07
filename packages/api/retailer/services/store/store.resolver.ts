import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { Inject, Injectable, HttpService } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { UseGuards } from "@nestjs/common";
import { GraphqlAuthGuard } from "../../../common/auth/graphql.auth.guard";
import { User } from "../../../common/auth/user.decorator";
import { StoreRepository } from "../../domain/repositories/store.repository";
import StoreDTO from "./store.type";
import AddStoreInput from "./store.input_type";
import { ProductType } from "../../../common/data/product.enum";
import StoreProductDTO from "./store.product_type";
import StoreProducts from "./store.products_type";
import {
  AddStoreProduct,
  ChangeStoreProduct,
} from "./store.product.input_type";
import GetProductsArgs from "../product/product.args_type";

const { v4: uuidv4 } = require("uuid");

@Injectable()
@Resolver()
export class StoreResolver {
  constructor(
    private repository: StoreRepository,
    @Inject(KNEX_CONNECTION) private readonly knex: any,
    private httpService: HttpService
  ) {}

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
    if (dbProduct.images)
      product.image = `https://s3.amazonaws.com/bottlemarket.images/${
        dbProduct.images.split(",")[0]
      }`;

    product.size = `${dbProduct.size} ml`;
    product.salePrice = 0;

    return product;
  }

  @UseGuards(GraphqlAuthGuard)
  @Query((returns) => StoreProducts, { description: "Get the store products" })
  async storeProducts(
    @User() user: any,
    @Args()
    { limit, offset, type, searchText, category }: GetProductsArgs
  ): Promise<StoreProducts> {
    const userId = this.knex.raw("UUID_TO_BIN(?)", user.id);
    const storeId = this.knex.raw("BIN_TO_UUID(s.id)");
    const query = this.knex("store_product_view as sp")
      .select("sp.*")
      .join("store as s", "sp.store_id", storeId)
      .where("s.user_id", userId);

    const dbProducts = await query.map((dbProduct: any) => {
      const product = new StoreProductDTO();
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
    response.quantity = productInfo ? productInfo.quantity : 0;

    return response;
  }

  @Mutation(() => StoreProductDTO, {
    description: "Increment product quantity",
  })
  async incrementStoreProduct(
    @Args("productInput") productInput: ChangeStoreProduct
  ): Promise<StoreProductDTO> {
    const store = await this.repository.load(productInput.store_id);
    store.incrementProduct(productInput.product_size_id);
    store.commit();

    const response = new StoreProductDTO();
    response.id = productInput.product_size_id;
    const productInfo = store.products.get(productInput.product_size_id);
    response.quantity = productInfo ? productInfo.quantity : 0;

    return response;
  }

  @Mutation(() => StoreProductDTO, {
    description: "Decrement product quantity",
  })
  async decrementStoreProduct(
    @Args("productInput") productInput: ChangeStoreProduct
  ): Promise<StoreProductDTO> {
    const store = await this.repository.load(productInput.store_id);
    store.decrementProduct(productInput.product_size_id);
    store.commit();

    const response = new StoreProductDTO();
    response.id = productInput.product_size_id;
    const productInfo = store.products.get(productInput.product_size_id);
    response.quantity = productInfo ? productInfo.quantity : 0;

    return response;
  }
}

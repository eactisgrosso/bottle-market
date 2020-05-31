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
import ProductDTO from "../product/product.type";
import Products from "../product/products.type";
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

  private async mapProduct(dbProduct: any, product: ProductDTO) {
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
    const query = this.knex("store_product_size_view as msp")
      .select("msp.*")
      .join("store as ms", "msp.store_id", storeId)
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

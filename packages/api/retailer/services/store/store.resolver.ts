import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { Inject, Injectable, HttpService } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { UseGuards } from "@nestjs/common";
import { GraphqlAuthGuard } from "../../../common/auth/graphql.auth.guard";
import { User } from "../../../common/auth/user.decorator";
import StoreDTO from "./store.type";
import DeliveryAreaDTO from "./delivery.type";
import AddDeliveryAreaInput from "./delivery.input_type";
import AddStoreInput from "./store.input_type";

@Injectable()
@Resolver()
export class StoreResolver {
  constructor(
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

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [DeliveryAreaDTO])
  async deliveryAreas(@User() user: any): Promise<DeliveryAreaDTO[]> {
    const dbStores = await this.knex("delivery_area_view")
      .select("*")
      .where("user_id", user.id);

    return dbStores;
  }

  @Mutation(() => StoreDTO, { description: "Create Store" })
  async createStore(@Args("store") store: AddStoreInput): Promise<StoreDTO> {
    console.log(store, "store");

    return await store;
  }

  @Mutation(() => DeliveryAreaDTO, { description: "Create Delivery Area" })
  async createDeliveryArea(
    @Args("deliveryArea") deliveryArea: AddDeliveryAreaInput
  ): Promise<DeliveryAreaDTO> {
    console.log(deliveryArea, "deliveryArea");

    return await deliveryArea;
  }
}

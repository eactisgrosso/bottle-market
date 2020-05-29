import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { Inject, Injectable, HttpService } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { UseGuards } from "@nestjs/common";
import { GraphqlAuthGuard } from "../../../common/auth/graphql.auth.guard";
import { User } from "../../../common/auth/user.decorator";
import { StoreRepository } from "../../domain/repositories/store.repository";
import StoreDTO from "./store.type";
import DeliveryAreaDTO from "./delivery.type";
import AddDeliveryAreaInput from "./delivery.input_type";
import AddStoreInput from "./store.input_type";

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

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [DeliveryAreaDTO])
  async deliveryAreas(@User() user: any): Promise<DeliveryAreaDTO[]> {
    const dbStores = await this.knex("delivery_area_view")
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
    Object.keys(storeInput).forEach(
      (key) => ((dto as StoreDTO)[key] = storeInput[key])
    );

    return dto;
  }

  @Mutation(() => DeliveryAreaDTO, { description: "Create Delivery Area" })
  async createDeliveryArea(
    @Args("deliveryArea") deliveryArea: AddDeliveryAreaInput
  ): Promise<DeliveryAreaDTO> {
    console.log(deliveryArea, "deliveryArea");

    return await deliveryArea;
  }
}

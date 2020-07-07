import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { Inject, Injectable } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { UseGuards } from "@nestjs/common";
import { GraphqlAuthGuard } from "../../../common/auth/graphql.auth.guard";
import { User } from "../../../common/auth/user.decorator";
import { StoreRepository } from "../../domain/repositories/store.repository";
import { AddStoreInput, StoreDTO } from "./store.types";

const { v4: uuidv4 } = require("uuid");

@Injectable()
@Resolver()
export class StoreResolver {
  constructor(
    private repository: StoreRepository,
    @Inject(KNEX_CONNECTION) private readonly knex: any
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

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => String)
  async deleteStore(@Args("id") id: string): Promise<string> {
    const store = await this.repository.load(id);
    store.close();
    store.commit();

    return id;
  }
}

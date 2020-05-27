import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { Inject, Injectable, HttpService } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { UseGuards } from "@nestjs/common";
import { GraphqlAuthGuard } from "../../../common/auth/graphql.auth.guard";
import { User } from "../../../common/auth/user.decorator";
import StoreDTO from "./store.type";
import DeliveryAreaDTO from "./delivery.type";

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
  async delivery_areas(@User() user: any): Promise<DeliveryAreaDTO[]> {
    const dbStores = await this.knex("delivery_area_view")
      .select("*")
      .where("user_id", user.id);

    return dbStores;
  }
}

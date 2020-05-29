import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { Inject, Injectable, HttpService } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { UseGuards } from "@nestjs/common";
import { GraphqlAuthGuard } from "../../../common/auth/graphql.auth.guard";
import StateDTO from "./state.type";
import CityDTO from "./city.type";

@Injectable()
@Resolver()
export class LocationResolver {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: any) {}

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [StateDTO])
  async states(): Promise<StateDTO[]> {
    const dbStates = await this.knex("state").select("id", "name");

    return dbStates;
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [CityDTO])
  async cities(@Args("state_id") state_id: string): Promise<CityDTO[]> {
    const dbCities = await this.knex("city")
      .select("id", "name")
      .where("state_id", state_id);

    return dbCities;
  }
}

import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { Inject, Injectable, HttpService } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { UseGuards } from "@nestjs/common";
import { GraphqlAuthGuard } from "../../../common/auth/graphql.auth.guard";
import UserDTO from "./user.type";
import StoreDTO from "../store/store.type";

@Injectable()
@Resolver()
export class UserResolver {
  constructor(
    @Inject(KNEX_CONNECTION) private readonly knex: any,
    private httpService: HttpService
  ) {}

  @UseGuards(GraphqlAuthGuard)
  @Query(() => UserDTO)
  async me(@Args("id") id: string): Promise<UserDTO> {
    let user = new UserDTO();

    const dbUser = await this.knex("user")
      .select("email", "firstname", "lastname")
      .where("id", id)
      .first();
    if (dbUser) {
      user.id = id;
      user.email = dbUser.email;
      user.name = `${dbUser.firstname} ${dbUser.lastname}`;
    }

    return user;
  }
}

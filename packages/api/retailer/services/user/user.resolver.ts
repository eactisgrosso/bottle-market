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
    const aggregateId = this.knex.raw("UUID_TO_BIN(?)", id);

    const dbUser = await this.knex("user")
      .select("email", "firstname", "lastname")
      .where("aggregateId", aggregateId)
      .first();
    if (dbUser) {
      user.id = id;
      user.email = dbUser.email;
      user.name = `${dbUser.firstname} ${dbUser.lastname}`;

      const storeId = this.knex.raw("BIN_TO_UUID(id) as id");
      const dbStores = await this.knex("store")
        .select(storeId, "name")
        .where("user_id", aggregateId);
      if (dbStores.length > 0)
        user.store = dbStores.map((s) => new StoreDTO(s.id, s.name));
    }

    return user;
  }
}

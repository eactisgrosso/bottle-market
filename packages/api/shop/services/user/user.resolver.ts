import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { Inject, Injectable, HttpService } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { UseGuards } from "@nestjs/common";
import { GraphqlAuthGuard } from "../../../common/auth/graphql.auth.guard";

import { UserRepository } from "../../domain/repositories/user.repository";
import { CreateUserInput, UpdateUserInput } from "./user.input_type";
import UserDTO from "./user.type";
import loadUsers from "./user.sample";

const { v4: uuidv4 } = require("uuid");

@Injectable()
@Resolver()
export class UserResolver {
  constructor(
    private repository: UserRepository,
    @Inject(KNEX_CONNECTION) private readonly knex: any,
    private httpService: HttpService
  ) {}

  private readonly items: UserDTO[] = loadUsers();

  // @UseGuards(GraphqlAuthGuard)
  @Mutation(() => UserDTO, { description: "Log In User" })
  async signMeUp(
    @Args("signUpInput") signUpInput: CreateUserInput
  ): Promise<UserDTO> {
    const bottleId = uuidv4();
    const user = await this.repository.load(bottleId);
    user.signUp(
      signUpInput.sub,
      signUpInput.email,
      signUpInput.firstname,
      signUpInput.lastname
    );
    user.commit();

    await this.httpService
      .patch(
        `${process.env.AUTH0_DOMAIN}api/v2/users/${signUpInput.sub}`,
        {
          app_metadata: {
            bottleId: bottleId,
          },
        },
        {
          headers: {
            authorization: `Bearer ${process.env.AUTH0_TOKEN}`,
            "content-type": "application/json",
          },
        }
      )
      .toPromise()
      .catch((e) => {
        console.log(e);
      });

    return await this.items[0];
  }

  // @UseGuards(GraphqlAuthGuard)
  @Query(() => UserDTO)
  async me(@Args("id") id: string): Promise<UserDTO> {
    let user = new UserDTO();
    const aggregateId = this.knex.raw("UUID_TO_BIN(?)", id);

    const dbUser = await this.knex("marketplace_user")
      .select("email", "firstname", "lastname")
      .where("aggregateId", aggregateId)
      .first();
    if (dbUser) {
      user.id = id;
      user.email = dbUser.email;
      user.name = `${dbUser.firstname} ${dbUser.lastname}`;
      user.contact = [];
      user.address = [];
      user.card = [];

      //TEST DATA
      const test = this.items.find((u) => u.id == "1");
      if (test) {
        user.contact = test.contact;
        user.address = test.address;
        user.card = test.card;
      }
    }

    return user;
  }

  // @UseGuards(GraphqlAuthGuard)
  @Mutation(() => UserDTO, { description: "Update User" })
  async updateMe(@Args("meInput") meInput: UpdateUserInput): Promise<UserDTO> {
    const user = await this.repository.load(meInput.id);
    if (!user) throw Error("User not found");

    const me = new UserDTO();
    user.changeName(meInput.name);
    user.commit();

    me.id = meInput.id;
    me.email = user.email;
    me.name = `${user.firstname} ${user.lastname}`;

    return me;
  }

  @Mutation(() => UserDTO, { description: "Add or Edit Address" })
  async updateAddress(
    @Args("addressInput") addressInput: string
  ): Promise<UserDTO> {
    console.log(addressInput, "addressinput");
    return await this.items[0];
  }

  @Mutation(() => UserDTO, { description: "Add or Edit Contact" })
  async updateContact(
    @Args("contactInput") contactInput: string
  ): Promise<UserDTO> {
    console.log(contactInput, "contactinput");
    return await this.items[0];
  }

  @Mutation(() => UserDTO, { description: "Delete Address" })
  async deleteAddress(@Args("addressId") addressId: string): Promise<UserDTO> {
    console.log(addressId, "address_id");
    return await this.items[0];
  }

  @Mutation(() => UserDTO, { description: "Delete Contact" })
  async deleteContact(@Args("contactId") contactId: string): Promise<UserDTO> {
    console.log(contactId, "contact_id");
    return await this.items[0];
  }

  @Mutation(() => UserDTO, { description: "Add Payment Card" })
  async addPaymentCard(@Args("cardInput") cardInput: string): Promise<UserDTO> {
    console.log(cardInput, "cardInput");
    return await this.items[0];
  }

  @Mutation(() => UserDTO, { description: "Delete Payment Card" })
  async deletePaymentCard(@Args("cardId") cardId: string): Promise<UserDTO> {
    console.log(cardId, "card_id");
    return await this.items[0];
  }
}

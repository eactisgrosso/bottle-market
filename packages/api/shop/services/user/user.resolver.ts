import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { Inject, Injectable, HttpService } from "@nestjs/common";
import { KNEX_CONNECTION } from "@nestjsplus/knex";
import { UseGuards } from "@nestjs/common";
import { GraphqlAuthGuard } from "../../../common/auth/graphql.auth.guard";

import { UserRepository } from "../../repositories/user.repository";
import uuidV4 from "uuid/v4";
import CreateUserInput from "./user.input_type";
import UserDTO from "./user.type";
import loadUsers from "./user.sample";

@Injectable()
@Resolver()
export class UserResolver {
  constructor(
    private repository: UserRepository,
    @Inject(KNEX_CONNECTION) private readonly knex: any,
    private httpService: HttpService
  ) {}

  private readonly items: UserDTO[] = loadUsers();

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => UserDTO, { description: "Log In User" })
  async signMeUp(
    @Args("signUpInput") signUpInput: CreateUserInput
  ): Promise<UserDTO> {
    const bottleId = uuidV4();
    const user = await this.repository.load(bottleId);
    user.create(
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

  @Query(() => UserDTO)
  async me(@Args("id") id: string): Promise<UserDTO> {
    console.log(id, "user_id");
    return await this.items[0];
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => UserDTO, { description: "Update User" })
  async updateMe(@Args("meInput") meInput: string): Promise<UserDTO> {
    console.log(meInput, "meInput");

    const user = await this.repository.load("1");
    user.changeName("Eze");

    user.commit();

    return await this.items[0];
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

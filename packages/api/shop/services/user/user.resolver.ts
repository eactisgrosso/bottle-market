import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { GraphqlAuthGuard } from "../../../common/auth/graphql.auth.guard";

import { UserRepository } from "../../repositories/user.repository";
import UserDTO from "./user.dto";
import loadUsers from "./user.sample";

@Resolver()
export class UserResolver {
  constructor(private repository: UserRepository) {}

  private readonly items: UserDTO[] = loadUsers();

  @UseGuards(GraphqlAuthGuard)
  @Query(() => UserDTO)
  async me(@Args("id") id: string): Promise<UserDTO> {
    console.log(id, "user_id");
    return await this.items[0];
  }

  @Mutation(() => UserDTO, { description: "Update User" })
  async updateMe(@Args("meInput") meInput: string): Promise<UserDTO> {
    console.log(meInput, "meInput");

    const user = await this.repository.findOneById("1");
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

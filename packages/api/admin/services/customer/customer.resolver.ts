import { Resolver, Query, Args, ID, Int, Mutation } from "@nestjs/graphql";
import Customer from "./customer.type";
import loadCustomers from "../../data/customer.data";
import search from "../../helpers/search";
import { sortByHighestNumber, sortByLowestNumber } from "../../helpers/sorts";
@Resolver()
export default class CustomerResolver {
  private readonly customersCollection: Customer[] = loadCustomers();

  @Query(() => [Customer])
  async customers(
    @Args("searchBy", { type: () => String, nullable: true }) searchBy: string,
    @Args("sortBy", { type: () => String, defaultValue: null }) sortBy: string,
    @Args("limit", { type: () => Int, defaultValue: 7 }) limit: number
  ): Promise<Customer[] | undefined> {
    // as auth Customer. check from middleware.
    let customers = this.customersCollection;

    if (sortBy === "highestToLowest") {
      customers = await sortByHighestNumber(customers, "total_order_amount");
    }
    if (sortBy === "lowestToHighest") {
      customers = await sortByLowestNumber(customers, "total_order_amount");
    }
    return await search(customers, ["name", "creation_date"], searchBy);
  }

  @Query(() => Customer)
  async customer(
    @Args("id", { type: () => ID }) id: string
  ): Promise<Customer | undefined> {
    // as auth Customer. check from middleware.
    console.log(id, "customer_id");
    return await this.customersCollection.find(
      (customer) => customer.id === id
    );
  }
}

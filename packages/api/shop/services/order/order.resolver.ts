import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";

import { filterOrder } from "../../helpers/filter";
import OrderDTO from "./order.dto";
import loadOrders from "./order.sample";

@Resolver()
export class OrderResolver {
  private readonly items: OrderDTO[] = loadOrders();

  @Query(() => [OrderDTO], { description: "Get all the Orders" })
  async orders(
    @Args("user", { type: () => Int }) user: number,
    @Args("text", { type: () => String, nullable: true }) text: string,
    @Args("limit", { type: () => Int, defaultValue: 7 }) limit: number
  ): Promise<OrderDTO[]> {
    // return await take(this.items.filter(item => item.userId === user), limit);
    return await filterOrder(this.items, user, limit, text);
  }

  @Query(() => OrderDTO, { description: "Get single order" })
  async order(
    @Args("id", { type: () => String }) id: number
  ): Promise<OrderDTO | undefined> {
    return await this.items.find((item) => item.id === id);
  }

  @Mutation(() => OrderDTO, { description: "Add an Order" })
  async addOrder(@Args("orderInput") orderInput: string): Promise<OrderDTO> {
    console.log(orderInput, "orderinput");

    return await this.items[0];
  }
}

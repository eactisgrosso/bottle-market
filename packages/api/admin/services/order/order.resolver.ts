import { Resolver, Query, Args, Int, Mutation, ID } from "@nestjs/graphql";
import loadOrders from "../../data/order.data";
import Order from "./order.type";
import search from "../../helpers/search";
@Resolver()
export default class OrderResolver {
  private readonly ordersCollection: Order[] = loadOrders();

  @Query((returns) => [Order], { description: "Get all the Orders" })
  async orders(
    @Args("status", { type: () => String, nullable: true }) status: string,
    @Args("limit", { type: () => Int, defaultValue: 50 }) limit: number,
    @Args("searchText", { type: () => String, defaultValue: "" })
    searchText: string
  ): Promise<Order[] | undefined> {
    let orders = this.ordersCollection;
    if (status) {
      orders = await orders.filter((order) => order.status === status);
    }
    return await search(
      orders.slice(0, limit),
      ["delivery_address"],
      searchText
    );
  }

  @Query((returns) => Order, { description: "Get single order" })
  async order(
    @Args("id", { type: () => ID }) id: string
  ): Promise<Order | undefined> {
    return await this.ordersCollection.find((item) => item.id === id);
  }

  // @Mutation(returns => Order, { description: 'Add an Order' })
  // async addOrder(@Arg('orderInput') orderInput: Order): Promise<Order> {
  //   console.log(orderInput, 'orderinput');
  //   return await orderInput;
  // }
}

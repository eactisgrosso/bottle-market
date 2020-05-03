import { ObjectType, Field } from "@nestjs/graphql";
import OrderProduct from "./orderProduct.type";
// import { OrderStatusEnum } from './orderStatusEnum';

@ObjectType()
export default class OrderDTO {
  @Field()
  id: number;

  @Field()
  userId: number;

  @Field((type) => [OrderProduct])
  products: OrderProduct[];

  @Field((type) => String)
  status: number;

  @Field((type) => String)
  deliveryTime: string;

  @Field((type) => String)
  amount: number;

  @Field((type) => String)
  subtotal: number;

  @Field((type) => String)
  discount: number;

  @Field((type) => String)
  deliveryFee: number;

  @Field((type) => String)
  deliveryAddress: string;

  @Field((type) => String)
  date: string;
}

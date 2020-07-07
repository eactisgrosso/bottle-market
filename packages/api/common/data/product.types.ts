import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class ProductAvailability {
  constructor(id: string, price: number, quantity: number) {
    this.id = id;
    this.price = price;
    this.quantity = quantity;
  }

  @Field()
  id: string;

  @Field()
  quantity: number;

  @Field()
  price: number;
}

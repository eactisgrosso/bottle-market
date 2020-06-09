import { InputType, Field, Int } from "@nestjs/graphql";

@InputType({ description: "Adds new products to the store" })
export class AddStoreProduct {
  @Field()
  store_id: string;

  @Field()
  product_size_id: string;

  @Field()
  price: number;
}

@InputType()
export class ProductQuantity {
  @Field()
  id: string;

  @Field(() => [Int])
  quantity: number;
}

@InputType({ description: "Changes the quantity of product in a store" })
export class ChangeProductQuantities {
  @Field()
  store_id: string;

  @Field(() => [ProductQuantity])
  quantities: ProductQuantity[];
}

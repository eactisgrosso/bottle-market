import { InputType, Field, ID, Int, Float } from "@nestjs/graphql";

@InputType({ description: "Adds new products to the store" })
export class AddStoreProduct {
  @Field()
  store_id: string;

  @Field()
  product_size_id: string;

  @Field()
  price: number;
}

@InputType({ description: "Changes the quantity of product in a store" })
export class ChangeStoreProduct {
  @Field()
  store_id: string;

  @Field()
  product_size_id: string;
}

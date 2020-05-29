import { InputType, Field, ID, Int, Float } from "@nestjs/graphql";
import StoreDTO from "./store.type";

@InputType({ description: "New store data" })
export default class AddStoreInput implements Partial<StoreDTO> {
  @Field()
  creation_date: Date;

  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  state_id: string;

  @Field()
  state: string;

  @Field()
  city_id: string;

  @Field()
  city: string;

  @Field()
  street: string;
}

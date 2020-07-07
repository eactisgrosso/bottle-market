import { InputType, ObjectType, Field } from "@nestjs/graphql";

@InputType({ description: "New store data" })
export class AddStoreInput implements Partial<StoreDTO> {
  @Field()
  name: string;

  @Field()
  store_type: string;

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

@ObjectType()
export class StoreDTO {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  store_type: string;

  @Field()
  state: string;

  @Field()
  city: string;

  @Field()
  street: string;

  @Field()
  delivery_areas: number;

  @Field()
  products: number;
}

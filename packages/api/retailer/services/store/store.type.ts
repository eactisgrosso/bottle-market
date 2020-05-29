import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export default class StoreDTO {
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
}

import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export default class StoreDTO {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  postalcode: string;

  @Field()
  street: string;

  @Field()
  city: string;

  @Field()
  state: string;
}

import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export default class Address {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  name: string;

  @Field()
  info: string;
}

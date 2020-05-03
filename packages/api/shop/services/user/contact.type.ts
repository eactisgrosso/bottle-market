import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export default class Contact {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  number: string;
}

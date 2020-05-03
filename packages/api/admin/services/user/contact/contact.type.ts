import { ObjectType, ID, Field } from "@nestjs/graphql";

@ObjectType()
export default class Contact {
  @Field((type) => ID)
  id: string;

  @Field()
  type: string;

  @Field()
  number: string;
}

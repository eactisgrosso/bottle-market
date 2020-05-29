import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export default class StateDTO {
  @Field()
  id: string;

  @Field()
  name: string;
}

import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export default class Payment {
  @Field((type) => String)
  status: number;
}

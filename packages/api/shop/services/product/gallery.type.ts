import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export default class Gallery {
  @Field()
  url: string;
}

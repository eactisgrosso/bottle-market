import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export default class CityDTO {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  state_id: string;
}

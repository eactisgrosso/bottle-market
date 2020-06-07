import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export default class UserDTO {
  @Field((type) => String)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}

import { ObjectType, Field } from "@nestjs/graphql";
import Store from "./store.type";

@ObjectType()
export default class UserDTO {
  @Field((type) => String)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field((type) => [Store])
  store: Store[];
}

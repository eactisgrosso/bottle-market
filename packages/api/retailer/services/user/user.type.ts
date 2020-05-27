import { ObjectType, Field } from "@nestjs/graphql";
import StoreDTO from "../store/store.type";

@ObjectType()
export default class UserDTO {
  @Field((type) => String)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field((type) => [StoreDTO])
  store: StoreDTO[];
}

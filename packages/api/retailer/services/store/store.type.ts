import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export default class StoreDTO {
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  postalcode: string;

  @Field()
  street: string;

  @Field()
  city: string;

  @Field()
  state: string;
}

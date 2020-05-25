import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export default class Store {
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  @Field()
  id: string;

  @Field()
  name: string;
}

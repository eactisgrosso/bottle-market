import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export default class DeliveryAreaDeleteDTO {
  @Field()
  id: string;

  @Field()
  store_id: string;
}

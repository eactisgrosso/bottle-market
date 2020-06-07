import { ObjectType, Field, Int } from "@nestjs/graphql";
import StoreProductDTO from "./store.product_type";
@ObjectType()
export default class StoreProducts {
  @Field((type) => [StoreProductDTO])
  items: StoreProductDTO[];

  @Field((type) => Int)
  totalCount: number;

  @Field()
  hasMore: boolean;
}

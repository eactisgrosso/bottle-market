import { ObjectType, Field, Int } from "@nestjs/graphql";
import ProductDTO from "./product.type";
@ObjectType()
export default class Products {
  @Field((type) => [ProductDTO])
  items: ProductDTO[];

  @Field((type) => Int)
  totalCount: number;

  @Field()
  hasMore: boolean;
}

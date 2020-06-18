import { Field, ID, Int, Float, ObjectType } from "@nestjs/graphql";
import Category from "../category/category.type";

@ObjectType()
export default class ProductDTO {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  image: string;

  @Field()
  type: string;

  @Field()
  size: string;

  @Field((type) => [Category])
  categories: Category[];

  @Field((type) => Float)
  price: number;

  @Field((type) => Float)
  priceRetail: number;

  @Field((type) => Int)
  discountInPercent: number;

  @Field((type) => Int)
  quantity: number;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creation_date: Date;

  @Field()
  slug: string;
}

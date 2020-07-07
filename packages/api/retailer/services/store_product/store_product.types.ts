import {
  ArgsType,
  Field,
  ID,
  Int,
  Float,
  ObjectType,
  InputType,
} from "@nestjs/graphql";

@ArgsType()
export class GetProductsArgs {
  @Field()
  store_id: string;

  @Field((type) => Int, { defaultValue: 12 })
  limit: number;

  @Field((type) => Int, { defaultValue: 0 })
  offset: number;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  searchText?: string;

  @Field({ nullable: true })
  category?: string;
}

@ObjectType()
export class StoreProductDTO {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  store_id?: string;

  @Field()
  product_size_id: string;

  @Field()
  title: string;

  @Field()
  image: string;

  @Field()
  type: string;

  @Field()
  size: string;

  @Field((type) => Float, { nullable: true })
  price?: number;

  @Field((type) => Float)
  price_retail: number;

  @Field((type) => Int)
  promo_discount: number;

  @Field((type) => Int)
  quantity: number;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creation_date: Date;

  @Field()
  slug: string;
}

@ObjectType()
export class StoreProducts {
  @Field((type) => [StoreProductDTO])
  items: StoreProductDTO[];

  @Field((type) => Int)
  totalCount: number;

  @Field()
  hasMore: boolean;
}

@InputType()
export class ChangeProductAvailability {
  @Field()
  id: string;

  @Field()
  store_id: string;

  @Field()
  product_size_id: string;

  @Field((type) => Int)
  price: number;

  @Field((type) => Int)
  quantity: number;
}

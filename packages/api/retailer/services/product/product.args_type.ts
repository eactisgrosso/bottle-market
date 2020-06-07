import { Field, Int, ArgsType } from "@nestjs/graphql";
@ArgsType()
export default class GetProductsArgs {
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

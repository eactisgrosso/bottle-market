import { ObjectType, Field, ID } from "@nestjs/graphql";
import { ProductType } from "../../../common/data/product.enum";
import Category from "../category/category.type";
import Gallery from "./gallery.type";
import PaginatedResponse from "../../helpers/paginated-response";

@ObjectType()
export default class ProductDTO {
  @Field()
  id: string;

  @Field()
  slug: string;

  @Field()
  title: string;

  @Field(() => ProductType)
  type: ProductType;

  @Field(() => [Category])
  categories: Category[];

  @Field()
  size: string;

  @Field()
  image: string;

  @Field(() => [Gallery])
  gallery: Gallery[];

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  salePrice: number;

  @Field()
  discountInPercent: number;
}

@ObjectType()
export class ProductResponse extends PaginatedResponse(ProductDTO) {
  constructor(productResponse: ProductResponse) {
    super();
    Object.assign(this, productResponse);
  }
}

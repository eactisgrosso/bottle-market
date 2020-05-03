import { InputType, Field } from "@nestjs/graphql";

@InputType()
export default class PaymentInput {
  @Field()
  token: string;

  @Field()
  amount: number;
}

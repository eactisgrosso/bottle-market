import { InputType, Field } from "@nestjs/graphql";

@InputType({ description: "New User Data" })
export default class CreateUserInput {
  @Field()
  sub: string;

  @Field()
  email: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;
}

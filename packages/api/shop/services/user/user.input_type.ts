import { InputType, Field } from "@nestjs/graphql";

@InputType({ description: "New User Data" })
export class CreateUserInput {
  @Field()
  sub: string;

  @Field()
  email: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;
}

@InputType({ description: "New User Data" })
export class UpdateUserInput {
  @Field()
  id: string;

  @Field()
  name: string;
}

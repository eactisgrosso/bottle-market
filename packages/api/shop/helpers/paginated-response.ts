import { Type } from "@nestjs/common";
import { ObjectType, Field, Int } from "@nestjs/graphql";

export default function PaginatedResponse<T>(classRef: Type<T>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field((type) => [classRef])
    items: T[];

    @Field((type) => Int)
    total: number;

    @Field()
    hasMore: boolean;
  }
  return PaginatedResponseClass;
}

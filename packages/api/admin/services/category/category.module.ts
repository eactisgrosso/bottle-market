import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import CategoryResolver from "./category.resolver";

@Module({
  imports: [CqrsModule],
  providers: [CategoryResolver],
})
export class CategoryModule {}

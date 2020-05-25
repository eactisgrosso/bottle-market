import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ProductResolver } from "./product.resolver";

@Module({
  imports: [CqrsModule],
  providers: [ProductResolver],
})
export class ProductModule {}

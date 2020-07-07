import { Module, HttpModule } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { StoreProductRepository } from "../../domain/repositories/store_product.repository";
import { EventHandlers } from "../../readmodel/store_product.handlers";
import { StoreProductResolver } from "./store_product.resolver";

@Module({
  imports: [
    CqrsModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [StoreProductRepository, StoreProductResolver, ...EventHandlers],
})
export class StoreProductModule {}

import { Module, HttpModule } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { StoreRepository } from "../../domain/repositories/store.repository";
import { EventHandlers } from "../../readmodel/store.handlers";
import { StoreResolver } from "./store.resolver";

@Module({
  imports: [
    CqrsModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [StoreRepository, StoreResolver, ...EventHandlers],
})
export class StoreModule {}

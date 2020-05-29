import { Module, HttpModule } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { DeliveryRepository } from "../../domain/repositories/delivery.repository";
import { EventHandlers } from "../../readmodel/delivery.handlers";
import { DeliveryResolver } from "./delivery.resolver";

@Module({
  imports: [
    CqrsModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [DeliveryRepository, DeliveryResolver, ...EventHandlers],
})
export class DeliveryModule {}

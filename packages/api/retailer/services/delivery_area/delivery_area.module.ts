import { Module, HttpModule } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { DeliveryAreaRepository } from "../../domain/repositories/delivery_area.repository";
import { EventHandlers } from "../../readmodel/delivery_area.handlers";
import { DeliveryResolver } from "./delivery_area.resolver";

@Module({
  imports: [
    CqrsModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [DeliveryAreaRepository, DeliveryResolver, ...EventHandlers],
})
export class DeliveryModule {}

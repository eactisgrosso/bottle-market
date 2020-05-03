import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { OrderResolver } from "./order.resolver";

@Module({
  imports: [CqrsModule],
  providers: [OrderResolver],
})
export class OrderModule {}

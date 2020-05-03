import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import CustomerResolver from "./customer.resolver";

@Module({
  imports: [CqrsModule],
  providers: [CustomerResolver],
})
export class CustomerModule {}

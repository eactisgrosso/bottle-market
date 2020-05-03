import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import StuffResolver from "./stuff.resolver";

@Module({
  imports: [CqrsModule],
  providers: [StuffResolver],
})
export class StuffModule {}

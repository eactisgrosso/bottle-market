import { Module, HttpModule } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { EventStore } from "../../../common/domain/event.store";
import { UserRepository } from "../../repositories/user.repository";
import { EventHandlers } from "../../handlers/user.handlers";
import { UserResolver } from "./user.resolver";

@Module({
  imports: [
    CqrsModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [EventStore, UserRepository, UserResolver, ...EventHandlers],
})
export class UserModule {}

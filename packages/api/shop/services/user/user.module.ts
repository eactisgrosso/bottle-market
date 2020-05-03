import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { EventStore } from "../../../common/eventstore";
import { UserRepository } from "../../repositories/user.repository";
import { EventHandlers } from "../../handlers/user";
import { UserResolver } from "./user.resolver";

@Module({
  imports: [CqrsModule],
  providers: [EventStore, UserRepository, UserResolver, ...EventHandlers],
})
export class UserModule {}

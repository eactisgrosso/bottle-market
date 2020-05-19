import { Module, HttpModule } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { UserRepository } from "../../domain/repositories/user.repository";
import { EventHandlers } from "../../readmodel/user.handlers";
import { UserResolver } from "./user.resolver";

@Module({
  imports: [
    CqrsModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [UserRepository, UserResolver, ...EventHandlers],
})
export class UserModule {}

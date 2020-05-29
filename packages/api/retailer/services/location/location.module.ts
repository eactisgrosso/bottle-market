import { Module, HttpModule } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { LocationResolver } from "./location.resolver";

@Module({
  imports: [
    CqrsModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [LocationResolver],
})
export class LocationModule {}

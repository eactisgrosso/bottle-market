import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "@nestjs/config";
import { KnexModule } from "@nestjsplus/knex";

import { IAppModule } from "../app";
import { AuthzModule } from "../common/auth/authz.module";

import { UserModule } from "./services/user/user.module";
import { LocationModule } from "./services/location/location.module";
import { StoreModule } from "./services/store/store.module";
import { DeliveryModule } from "./services/delivery/delivery.module";
import { ProductModule } from "./services/product/product.module";
import { ParameterStore } from "../common/config/parameterStore";

@Module({
  imports: [
    AuthzModule,
    UserModule,
    LocationModule,
    StoreModule,
    DeliveryModule,
    ProductModule,
    ConfigModule.forRoot({
      load: [async () => (await ParameterStore.getInstance()).authConfig],
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      path: "/retailer/graphql",
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
    }),
    KnexModule.registerAsync({
      useFactory: async () => (await ParameterStore.getInstance()).dbConfig,
    }),
  ],
})
export class AppModule implements IAppModule {}

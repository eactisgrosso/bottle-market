import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "@nestjs/config";
import { KnexModule } from "@nestjsplus/knex";

import { IAppModule } from "../app";
import { AuthzModule } from "../common/auth/authz.module";

import { ProductModule } from "./services/product/product.module";
import { UserModule } from "./services/user/user.module";
import { ParameterStore } from "../common/config/parameterStore";

@Module({
  imports: [
    AuthzModule,
    ProductModule,
    UserModule,
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

import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { KnexModule } from "@nestjsplus/knex";

import { IAppModule } from "../app";

import { ProductModule } from "./services/product/product.module";
import { ParameterStore } from "../common/config/parameterStore";

@Module({
  imports: [
    ProductModule,
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

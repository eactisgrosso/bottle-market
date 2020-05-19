import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { KnexModule } from "@nestjsplus/knex";

import { IAppModule } from "../app";

import { ProductModule } from "./services/product/product.module";
import { CategoryModule } from "./services/category/category.module";
import { CustomerModule } from "./services/customer/customer.module";
import { CouponModule } from "./services/coupon/coupon.module";
import { OrderModule } from "./services/order/order.module";
import { StuffModule } from "./services/stuff/stuff.module";

import { ParameterStore } from "../common/data/parameterStore";

@Module({
  imports: [
    ProductModule,
    CategoryModule,
    CustomerModule,
    CouponModule,
    OrderModule,
    StuffModule,
    GraphQLModule.forRoot({
      path: "/admin/graphql",
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
    }),
    KnexModule.registerAsync({
      useFactory: async () => (await ParameterStore.getInstance()).dbConfig,
    }),
  ],
})
export class AppModule implements IAppModule {}

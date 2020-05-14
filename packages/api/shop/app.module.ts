import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "@nestjs/config";
import { KnexModule } from "@nestjsplus/knex";

import { IAppModule } from "../app";
import { AuthzModule } from "../common/auth/authz.module";
import { UserModule } from "./services/user/user.module";
import { ProductModule } from "./services/product/product.module";
import { PaymentModule } from "./services/payment/payment.module";
import { OrderModule } from "./services/order/order.module";
import { CouponModule } from "./services/coupon/coupon.module";
import { CategoryModule } from "./services/category/category.module";

import dbConfig from "../common/data/dbfactory";

@Module({
  imports: [
    AuthzModule,
    UserModule,
    ProductModule,
    PaymentModule,
    OrderModule,
    CouponModule,
    CategoryModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      path: "/shop/graphql",
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
    KnexModule.registerAsync({
      useFactory: dbConfig,
    }),
  ],
})
export class AppModule implements IAppModule {}

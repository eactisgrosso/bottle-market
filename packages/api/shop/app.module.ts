import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "@nestjs/config";
import { KnexModule } from "@nestjsplus/knex";

import { IAppModule } from "../app";
import { UserModule } from "./services/user/user.module";
import { ProductModule } from "./services/product/product.module";
import { PaymentModule } from "./services/payment/payment.module";
import { OrderModule } from "./services/order/order.module";
import { CouponModule } from "./services/coupon/coupon.module";
import { CategoryModule } from "./services/category/category.module";

@Module({
  imports: [
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
      autoSchemaFile: "schema.gql",
    }),
    KnexModule.register({
      client: "mysql",
      connection: {
        host: process.env.DATABASE_HOST,
        port: 3306,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: "bottlehub",
      },
    }),
  ],
})
export class AppModule implements IAppModule {}

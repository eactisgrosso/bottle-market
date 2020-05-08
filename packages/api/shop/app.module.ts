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

const AWS = require("aws-sdk");
const ssm = new AWS.SSM({ region: "us-east-1" });

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
      autoSchemaFile: true,
    }),
    KnexModule.registerAsync({
      useFactory: async () => {
        const host =
          process.env.NODE_ENV == "development"
            ? "localhost"
            : await ssm
                .getParameter({
                  Name: "/staging/DATABASE_HOST",
                  WithDecryption: false,
                })
                .promise().Parameter.Value;

        const userdata = await ssm
          .getParameters({
            Names: ["/staging/DATABASE_USER", "/staging/DATABASE_PASSWORD"],
            WithDecryption: true,
          })
          .promise();

        return {
          client: "mysql",
          connection: {
            host: host,
            port: 3306,
            user: userdata.Parameters[1].Value,
            password: userdata.Parameters[0].Value,
            database: "bottlehub",
          },
        };
      },
    }),
  ],
})
export class AppModule implements IAppModule {}

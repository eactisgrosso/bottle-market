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

let DATABASE_HOST;
let DATABASE_USER;
let DATABASE_PASSWORD;

async function getSystemParam(name: string, withDecryption: boolean) {
  var params = {
    Name: `/staging/${name}`,
    WithDecryption: withDecryption,
  };

  var request = await ssm.getParameter(params).promise();

  return request.Parameter.Value;
}

async function loadDBparams() {
  DATABASE_HOST = await getSystemParam("DATABASE_HOST", false);
  DATABASE_USER = await getSystemParam("DATABASE_USER", true);
  DATABASE_PASSWORD = await getSystemParam("DATABASE_PASSWORD", true);
}

loadDBparams();

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
        host: DATABASE_HOST,
        port: 3306,
        user: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: "bottlehub",
      },
    }),
  ],
})
export class AppModule implements IAppModule {}

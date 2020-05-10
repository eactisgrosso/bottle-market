import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";

import { IAppModule } from "../app";

import { ProductModule } from "./services/product/product.module";
import { CategoryModule } from "./services/category/category.module";
import { CustomerModule } from "./services/customer/customer.module";
import { CouponModule } from "./services/coupon/coupon.module";
import { OrderModule } from "./services/order/order.module";
import { StuffModule } from "./services/stuff/stuff.module";

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
  ],
})
export class AppModule implements IAppModule {}

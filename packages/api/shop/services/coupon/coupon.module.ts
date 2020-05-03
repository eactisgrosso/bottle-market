import { Module } from "@nestjs/common";
import { CouponResolver } from "./coupon.resolver";

@Module({
  providers: [CouponResolver],
})
export class CouponModule {}

import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import CouponResolver from "./coupon.resolver";

@Module({
  imports: [CqrsModule],
  providers: [CouponResolver],
})
export class CouponModule {}

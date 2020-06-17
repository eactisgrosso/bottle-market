import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    if (user) {
      const info = user["https://app.bottlemarket.com.ar/userinfo"];
      if (info) user.id = info.bottleId;
    }
    return user;
  }
);

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { passportJwtSecret } from "jwks-rsa";
import { ConfigService } from "@nestjs/config";

// configService.get<string>("AUTH0_AUDIENCE")
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get<string>(
          "AUTH0_DOMAIN"
        )}.well-known/jwks.json`,
        handleSigningKeyError: (err, cb) => {
          console.log(">>>>>>>>>>>>>", err);
          return cb(new Error("Authentication Error"));
        },
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get<string>("AUTH0_AUDIENCE"),
      issuer: configService.get<string>("AUTH0_DOMAIN"),
      algorithms: ["RS256"],
    });
  }

  validate(payload: any) {
    return payload;
  }
}

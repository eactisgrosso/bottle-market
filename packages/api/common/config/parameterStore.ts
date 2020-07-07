import { KnexOptions } from "@nestjsplus/knex";
const AWS = require("aws-sdk");

export class ParameterStore {
  private static instance: ParameterStore;

  private constructor(
    private readonly host: string,
    private readonly user: string,
    private readonly pwd: string,
    readonly auth0Domain: string,
    readonly auth0Audience: string,
    readonly auth0Token: string
  ) {}

  public static async getInstance(): Promise<ParameterStore> {
    if (!ParameterStore.instance) {
      const credentials = new AWS.SharedIniFileCredentials({
        profile: process.env.AWS_PROFILE,
      });
      AWS.config.credentials = credentials;
      const ssm = new AWS.SSM({ region: "us-east-1" });

      let response = await ssm
        .getParameters({
          Names: [
            "/staging/DATABASE_HOST",
            "/staging/AUTH0_DOMAIN",
            "/staging/AUTH0_AUDIENCE",
          ],
          WithDecryption: false,
        })
        .promise();

      const host =
        process.env.NODE_ENV === "development"
          ? process.env.DB_HOST
          : response.Parameters[2].Value;
      const auth0Domain = response.Parameters[1].Value;
      const auth0Audience = response.Parameters[0].Value;

      response = await ssm
        .getParameters({
          Names: [
            "/staging/DATABASE_USER",
            "/staging/DATABASE_PASSWORD",
            "/staging/AUTH0_TOKEN",
          ],
          WithDecryption: true,
        })
        .promise();

      const user =
        process.env.NODE_ENV === "development"
          ? process.env.DB_USER
          : response.Parameters[2].Value;
      const pwd =
        process.env.NODE_ENV === "development"
          ? process.env.DB_PWD
          : response.Parameters[1].Value;
      const auth0Token = response.Parameters[0].Value;

      ParameterStore.instance = new ParameterStore(
        host,
        user,
        pwd,
        auth0Domain,
        auth0Audience,
        auth0Token
      );
    }

    return ParameterStore.instance;
  }

  dbConfig: KnexOptions = {
    client: "pg",
    connection: {
      host: this.host,
      user: this.user,
      password: this.pwd,
      database: process.env.DB_NAME ? process.env.DB_NAME : "postgres",
    },
  };

  authConfig: any = {
    AUTH0_DOMAIN: this.auth0Domain,
    AUTH0_AUDIENCE: this.auth0Audience,
    AUTH0_TOKEN: this.auth0Token,
  };
}

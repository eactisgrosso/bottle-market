import { KnexOptions } from "@nestjsplus/knex";

const AWS = require("aws-sdk");
const ssm = new AWS.SSM({ region: "us-east-1" });

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
        process.env.NODE_ENV != "development"
          ? response.Parameters[2].Value
          : "localhost";
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

      const user = response.Parameters[2].Value;
      const pwd = response.Parameters[1].Value;
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
    client: "mysql",
    connection: {
      host: this.host,
      port: 3306,
      user: this.user,
      password: this.pwd,
      database: "bottlehub",
    },
  };

  authConfig: any = {
    AUTH0_DOMAIN: this.auth0Domain,
    AUTH0_AUDIENCE: this.auth0Audience,
    AUTH0_TOKEN: this.auth0Token,
  };
}

import {
  Context,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import { App } from "./app";
import { AppModule } from "./shop/app.module";
import * as fastify from "fastify";
import { proxy } from "aws-serverless-fastify";
import { SecurityGroup } from "./common/security.group";

let fastifyServer: fastify.FastifyInstance;

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  if (!fastifyServer) {
    const sg = new SecurityGroup(process.env.SECURITY_GROUP_ID);
    await sg.addIpToInbound(3306);

    const app = new App(AppModule);
    fastifyServer = await app.bootstrap();
  }
  return await proxy(fastifyServer, event, context);
};

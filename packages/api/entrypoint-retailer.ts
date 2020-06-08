import {
  Context,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import { App } from "./app";
import { AppModule } from "./retailer/app.module";
import * as fastify from "fastify";
import { proxy } from "aws-serverless-fastify";

let fastifyServer: fastify.FastifyInstance;

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  if (!fastifyServer) {
    const app = new App(AppModule);
    fastifyServer = await app.bootstrap();
  }
  return await proxy(fastifyServer, event, context);
};

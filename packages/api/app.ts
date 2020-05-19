import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import fastify from "fastify";
export interface IAppModule {}

export class App {
  constructor(private readonly appModule: IAppModule) {}

  async bootstrap(): Promise<fastify.FastifyInstance> {
    const serverOptions: fastify.ServerOptionsAsHttp = {
      logger: {
        serializers: {
          res(reply) {
            // The default
            return {
              statusCode: reply.statusCode,
            };
          },
          req(request) {
            return {
              method: request.method,
              url: request.url,
              path: request.path,
              parameters: request.parameters,
              // Including the headers in the log could be in violation
              // of privacy laws, e.g. GDPR. You should use the "redact" option to
              // remove sensitive fields. It could also leak authentication data in
              // the logs.
              headers: request.headers,
            };
          },
        },
      },
    };
    const instance: fastify.FastifyInstance = fastify(serverOptions);
    const nestApp = await NestFactory.create<NestFastifyApplication>(
      this.appModule,
      new FastifyAdapter(instance),
      { cors: true }
    );
    await nestApp.init();
    return instance;
  }
}

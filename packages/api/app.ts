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
      logger: true,
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

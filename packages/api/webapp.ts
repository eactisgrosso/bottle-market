import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

export interface IAppModule {}

export class WebApp {
  constructor(private readonly module: IAppModule) {}

  async start() {
    const app = await NestFactory.create<NestFastifyApplication>(
      this.module,
      new FastifyAdapter(),
      { cors: true }
    );
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(4000);
    console.log(`🚀 Application is running on: ${await app.getUrl()}`);
  }
}

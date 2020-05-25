import { AppModule } from "./retailer/app.module";
import { App } from "./app";

async function startLocal() {
  const app = new App(AppModule);
  const fastifyInstance = await app.bootstrap();
  fastifyInstance.listen(4000, "0.0.0.0");
}
startLocal();

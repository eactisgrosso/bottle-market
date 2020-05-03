import { AppModule } from "./shop/app.module";
import { WebApp } from "./webapp";

async function bootstrap() {
  const app = new WebApp(AppModule);
  app.start();
}
bootstrap();

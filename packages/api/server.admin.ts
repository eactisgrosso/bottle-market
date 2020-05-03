import { AppModule } from "./admin/app.module";
import { WebApp } from "./webapp";

async function bootstrap() {
  const app = new WebApp(AppModule);
  app.start();
}
bootstrap();

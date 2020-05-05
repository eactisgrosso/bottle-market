import { AppModule } from "./admin/app.module";
import { WebApp } from "./webapp";

async function bootstrap() {
  const app = new WebApp(AppModule, 4000);
  app.start();
}
bootstrap();

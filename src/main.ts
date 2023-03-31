import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter, NestExpressApplication} from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());
  app.useStaticAssets(join(__dirname, '..','src', 'views', 'index.ejs'));
  app.setBaseViewsDir(join(__dirname, '..','src', 'views', 'index.ejs'));
  app.setViewEngine('ejs');
  await app.listen(3000);
}
bootstrap();

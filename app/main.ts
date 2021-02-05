import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import config from './config';
import { AppModule } from './modules/app.module';
import { NunjucksEnvironment } from './modules/view/helper/NunjucksEnvironment';

/**
 * 初始化 nunjucks
 */
function initNunjucks(app: NestExpressApplication) {
  const e = new NunjucksEnvironment();
  e.express(app);
}

/**
 * app 基础配置
 */
function configer(app: NestExpressApplication) {
  // 配置静态文件目录
  app.useStaticAssets(config.STATIC_PATH);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  configer(app);
  initNunjucks(app);

  await app.listen(config.APP_PORT, () => {
    Logger.log(`Server start at :${config.APP_PORT}`, 'MAIN');
  });
}

bootstrap();

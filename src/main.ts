require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.MAIN_PROCESS_PORT);
  console.log('main process running on ', process.env.MAIN_PROCESS_PORT);
}
bootstrap();

require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { VideoUploadWorkerModule } from './worker.module';

async function bootstrap() {
  const app = await NestFactory.create(VideoUploadWorkerModule);
  await app.listen(process.env.VIDEO_WORKER_PORT);
  console.log('video worker running on ', process.env.VIDEO_WORKER_PORT);
}
bootstrap();

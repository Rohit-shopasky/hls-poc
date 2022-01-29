import { Module, OnModuleInit } from '@nestjs/common';
import { VideoUploadWorkerSqsConsumer } from './worker.service';
import { MongooseModule } from '@nestjs/mongoose';
import { getDbCredentials } from '../../config/db.config';
import { VideoProcessQueue } from '../../queues/videoProcess.queue';
import { ConvertVideo } from '../../util/videoConverter';
import { VideoUploadModule } from '../../videoUpload/videoUpload.module';

@Module({
  imports: [
    VideoUploadModule,
    MongooseModule.forRootAsync({
      useFactory: async () => {
        return getDbCredentials();
      },
    }),
  ],
  providers: [VideoUploadWorkerSqsConsumer, VideoProcessQueue, ConvertVideo],
})
export class VideoUploadWorkerModule implements OnModuleInit {
  constructor(
    private readonly workerSqsConsumer: VideoUploadWorkerSqsConsumer,
  ) {}
  onModuleInit(): void {
    /** instantiate sqs consumer */
    this.workerSqsConsumer.consumer();
  }
}

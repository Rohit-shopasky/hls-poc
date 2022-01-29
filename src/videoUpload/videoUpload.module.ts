/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from '../config/multer.config';
import { VideoProcessQueue } from '../queues/videoProcess.queue';
import { VideoUploadController } from './videoUpload.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  VideoUploadEntity,
  VideoUploadEntitySchema,
} from './schema/videoUpload.schema';
import { VideoUploadRepository } from './repository/videoUpload.respository';
import { VideoUploadService } from './videoUpload.service';
import { ConvertVideo } from '../util/videoConverter';

@Module({
  imports: [
    MulterModule.register(multerOptions),
    MongooseModule.forFeature([
      { name: VideoUploadEntity.name, schema: VideoUploadEntitySchema },
    ]),
  ],
  controllers: [VideoUploadController],
  providers: [
    VideoProcessQueue,
    VideoUploadService,
    VideoUploadRepository,
    ConvertVideo,
  ],
  exports: [VideoUploadService, VideoUploadRepository],
})
export class VideoUploadModule {}

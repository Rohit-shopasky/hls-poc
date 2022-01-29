/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoProcessQueue } from '../queues/videoProcess.queue';
import { VideoUploadService } from './videoUpload.service';

@Controller()
export class VideoUploadController {
  constructor(
    private readonly videoQueueService: VideoProcessQueue,
    private readonly service: VideoUploadService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('video'))
  async uploadedFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const uploadVideoRecord = await this.service.uploadVideo(file.path);
      uploadVideoRecord.video_id = uploadVideoRecord.id;
      this.videoQueueService.enqueue({
        filepath: file.path,
        videoId: uploadVideoRecord.id,
      });
      return {
        status: 200,
        data: uploadVideoRecord,
        msg: 'ok',
      };
    } catch (error) {
      return {
        status: 500,
        data: {},
        msg: error.message || 'something went wrong!',
      };
    }
  }

  @Get('getVideoUrlByVideoId/:id')
  async getVideoUrlByVideoId(@Param('id') id) {
    try {
      console.log('id===>', id);
      const videoRecord = await this.service.getVideoByVideoId(id);
      return {
        status: 200,
        data: videoRecord,
        msg: 'ok',
      };
    } catch (error) {
      return {
        status: 500,
        data: {},
        msg: error.message || 'something went wrong!',
      };
    }
  }
}

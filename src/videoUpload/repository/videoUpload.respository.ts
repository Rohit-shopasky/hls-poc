import { InjectModel } from '@nestjs/mongoose';
import {
  VideoUploadEntity,
  VideoUploadEntityDocument,
} from '../schema/videoUpload.schema';
import { Model } from 'mongoose';
import { VideoUploadStatus } from '../constants';

export class VideoUploadRepository {
  constructor(
    @InjectModel(VideoUploadEntity.name)
    private readonly model: Model<VideoUploadEntityDocument>,
  ) {}
  async getVideoByVideoId(videoId: string): Promise<VideoUploadEntity> {
    try {
      const response = await this.model.findOne({
        _id: videoId,
        is_deleted: false,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createUploadVideo(filePath: string): Promise<VideoUploadEntity> {
    try {
      const preRecord: VideoUploadEntity = {
        filepath: filePath,
        upload_status: VideoUploadStatus.QUEUED,
      };
      const record = new this.model(preRecord);
      const response = await record.save();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateVideoStatus(
    videoId: string,
    status: VideoUploadStatus,
  ): Promise<VideoUploadEntity> {
    try {
      const fileUrl =
        status === VideoUploadStatus.PROCESSED
          ? `https://${process.env.BUCKET_URL}.s3.ap-south-1.amazonaws.com//${videoId}/${videoId}-v.m3u8`
          : null;
      const updateVideoStatus = await this.model.findByIdAndUpdate(
        { _id: videoId },
        {
          $set: {
            upload_status: status,
            file_url: fileUrl,
          },
        },
      );
      return updateVideoStatus;
    } catch (error) {
      throw error;
    }
  }
}

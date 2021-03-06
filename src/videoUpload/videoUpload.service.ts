import { Injectable } from '@nestjs/common';
import { VideoUploadRepository } from './repository/videoUpload.respository';
import { VideoUploadEntity } from './schema/videoUpload.schema';
import { VideoUploadStatus } from './constants';

@Injectable()
export class VideoUploadService {
  constructor(private readonly repository: VideoUploadRepository) {}

  async uploadVideo(filePath: string): Promise<VideoUploadEntity> {
    try {
      return await this.repository.createUploadVideo(filePath);
    } catch (error) {
      throw error;
    }
  }

  async updateVideoStatus(
    videoId: string,
    status: VideoUploadStatus,
  ): Promise<VideoUploadEntity> {
    try {
      return await this.repository.updateVideoStatus(videoId, status);
    } catch (error) {
      throw error;
    }
  }

  async getVideoByVideoId(videoId: string): Promise<VideoUploadEntity> {
    try {
      return await this.repository.getVideoByVideoId(videoId);
    } catch (error) {
      throw error;
    }
  }

  async getAllVideos(skip: number, take: number): Promise<VideoUploadEntity[]> {
    try {
      return await this.repository.getAllVideos(skip, take);
    } catch (error) {
      throw error;
    }
  }

  async deleteVideo(id: string): Promise<boolean> {
    try {
      return await this.repository.deleteVideo(id);
    } catch (error) {
      throw error;
    }
  }
}

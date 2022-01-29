import { VideoUploadEntity, VideoUploadEntityDocument } from '../schema/videoUpload.schema';
import { Model } from 'mongoose';
import { VideoUploadStatus } from '../constants';
export declare class VideoUploadRepository {
    private readonly model;
    constructor(model: Model<VideoUploadEntityDocument>);
    getVideoByVideoId(videoId: string): Promise<VideoUploadEntity>;
    createUploadVideo(filePath: string): Promise<VideoUploadEntity>;
    updateVideoStatus(videoId: string, status: VideoUploadStatus): Promise<VideoUploadEntity>;
    getAllVideos(skip: number, take: number): Promise<VideoUploadEntity[]>;
    deleteVideo(id: string): Promise<boolean>;
}

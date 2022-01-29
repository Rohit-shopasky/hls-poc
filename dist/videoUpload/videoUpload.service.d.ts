import { VideoUploadRepository } from './repository/videoUpload.respository';
import { VideoUploadEntity } from './schema/videoUpload.schema';
import { VideoUploadStatus } from './constants';
export declare class VideoUploadService {
    private readonly repository;
    constructor(repository: VideoUploadRepository);
    uploadVideo(filePath: string): Promise<VideoUploadEntity>;
    updateVideoStatus(videoId: string, status: VideoUploadStatus): Promise<VideoUploadEntity>;
    getVideoByVideoId(videoId: string): Promise<VideoUploadEntity>;
    getAllVideos(skip: number, take: number): Promise<VideoUploadEntity[]>;
    deleteVideo(id: string): Promise<boolean>;
}

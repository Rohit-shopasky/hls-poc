/// <reference types="multer" />
import { VideoProcessQueue } from '../queues/videoProcess.queue';
import { VideoUploadService } from './videoUpload.service';
export declare class VideoUploadController {
    private readonly videoQueueService;
    private readonly service;
    constructor(videoQueueService: VideoProcessQueue, service: VideoUploadService);
    uploadedFile(file: Express.Multer.File): Promise<{
        status: number;
        data: import("./schema/videoUpload.schema").VideoUploadEntity;
        msg: string;
    } | {
        status: number;
        data: {};
        msg: any;
    }>;
    getVideoUrlByVideoId(id: any): Promise<{
        status: number;
        data: import("./schema/videoUpload.schema").VideoUploadEntity;
        msg: string;
    } | {
        status: number;
        data: {};
        msg: any;
    }>;
}

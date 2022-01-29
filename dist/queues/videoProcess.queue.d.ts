import { IVideoEnqueuePayload, IQueueData } from './interfaces';
import { ConvertVideo } from '../util/videoConverter';
import { VideoUploadService } from '../videoUpload/videoUpload.service';
export declare class VideoProcessQueue {
    private readonly videoConvertService;
    private readonly videoUploadService;
    constructor(videoConvertService: ConvertVideo, videoUploadService: VideoUploadService);
    enqueue: (data: IVideoEnqueuePayload) => Promise<string>;
    dequeue: (data: IQueueData) => Promise<any>;
    deleteData: (receiptHandle: string) => Promise<boolean>;
}

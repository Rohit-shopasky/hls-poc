import { VideoProcessQueue } from '../../queues/videoProcess.queue';
export declare class VideoUploadWorkerSqsConsumer {
    private readonly queueService;
    constructor(queueService: VideoProcessQueue);
    consumer(): Promise<void>;
}

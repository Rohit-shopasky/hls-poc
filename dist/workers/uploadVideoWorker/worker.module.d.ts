import { OnModuleInit } from '@nestjs/common';
import { VideoUploadWorkerSqsConsumer } from './worker.service';
export declare class VideoUploadWorkerModule implements OnModuleInit {
    private readonly workerSqsConsumer;
    constructor(workerSqsConsumer: VideoUploadWorkerSqsConsumer);
    onModuleInit(): void;
}

import { IBucketArgs } from './interfaces';
export declare class ConvertVideo {
    constructor();
    convertVideo(filepath: string, videoId: string): Promise<boolean>;
    uploadHlsVideoToS3(params: IBucketArgs, originalVideoFilePath: string): Promise<boolean>;
    deleteVideo(dir: string, originalVideoFilePath: string): boolean;
}

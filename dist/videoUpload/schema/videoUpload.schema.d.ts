import { Document, Schema as schema } from 'mongoose';
export declare class VideoUploadEntity {
    id?: string;
    filepath: string;
    upload_status: string;
    file_url?: string;
    is_deleted?: boolean;
    video_id?: string;
}
export declare type VideoUploadEntityDocument = VideoUploadEntity & Document;
export declare const VideoUploadEntitySchema: schema<Document<VideoUploadEntity, any, any>, import("mongoose").Model<Document<VideoUploadEntity, any, any>, any, any, any>, any, any>;

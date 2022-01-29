/* tslint:disable variable-name */
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Schema as schema } from 'mongoose';
import { MONGODB_TIMESTAMP_FIELD } from '../../common/constants';

@Schema({
  collection: 'video_upload',
  timestamps: MONGODB_TIMESTAMP_FIELD,
})
export class VideoUploadEntity {
  id?: string;

  @Prop({ type: String, required: true })
  filepath: string;

  @Prop({ type: String, required: true })
  upload_status: string;

  @Prop({ type: String })
  file_url?: string;

  @Prop({ default: false })
  is_deleted?: boolean;

  video_id?: string;
}

export type VideoUploadEntityDocument = VideoUploadEntity & Document;
export const VideoUploadEntitySchema = SchemaFactory.createForClass(
  VideoUploadEntity,
);

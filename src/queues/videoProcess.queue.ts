/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Injectable,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  IVideoEnqueuePayload,
  IQueueInsertParams,
  IQueueData,
  IQueueDeleteParams,
} from './interfaces';
import { AWSClient } from '../config/cloud.config';
import { ConvertVideo } from '../util/videoConverter';
import { VideoUploadService } from '../videoUpload/videoUpload.service';
import { VideoUploadStatus } from '../videoUpload/constants';
const sqs = new AWSClient.SQS({ apiVersion: '2012-11-05' });

@Injectable()
export class VideoProcessQueue {
  constructor(
    private readonly videoConvertService: ConvertVideo,
    private readonly videoUploadService: VideoUploadService,
  ) {}

  enqueue = async (data: IVideoEnqueuePayload): Promise<string> => {
    const params: IQueueInsertParams = {
      MessageBody: JSON.stringify(data),
      QueueUrl: process.env.QUEUE_URL,
    };

    const result: string = await Promise.resolve(
      new Promise((resolve, reject) => {
        sqs.sendMessage(params, (err, data) => {
          if (err) {
            reject(new HttpException('Something went wrong', 500));
          } else {
            resolve(data.MessageId);
          }
        });
      }),
    );
    return result;
  };

  dequeue = async (data: IQueueData): Promise<any> => {
    try {
      await this.videoConvertService.convertVideo(
        data.message.filepath,
        data.message.videoId,
      );

      const isDeleted = await this.deleteData(data.receiptHandle);
      console.log('isProcess cleared from queue ', isDeleted);
      await this.videoUploadService.updateVideoStatus(
        data.message.videoId,
        VideoUploadStatus.PROCESSED,
      );
    } catch (error) {
      await this.videoUploadService.updateVideoStatus(
        data.message.videoId,
        VideoUploadStatus.FAILED,
      );
      throw error;
    }
  };

  deleteData = async (receiptHandle: string): Promise<boolean> => {
    try {
      const deleteParams: IQueueDeleteParams = {
        QueueUrl: process.env.QUEUE_URL,
        ReceiptHandle: receiptHandle,
      };
      const result: boolean = await Promise.resolve(
        new Promise((resolve, reject) => {
          sqs.deleteMessage(deleteParams, (err, data) => {
            if (err) {
              reject(
                new InternalServerErrorException(
                  {},
                  'Something went wrong while clearing data from queue!',
                ),
              );
            } else {
              resolve(true);
            }
          });
        }),
      );
      if (result) return true;
      else return false;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  };
}

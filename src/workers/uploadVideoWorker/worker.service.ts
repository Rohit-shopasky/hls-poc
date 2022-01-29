/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { Consumer } from 'sqs-consumer';
import { AWSClient } from '../../config/cloud.config';
import { IQueueData } from '../../queues/interfaces';
import { VideoProcessQueue } from '../../queues/videoProcess.queue';
@Injectable()
export class VideoUploadWorkerSqsConsumer {
  constructor(private readonly queueService: VideoProcessQueue) {}
  async consumer(): Promise<void> {
    const consumer = Consumer.create({
      queueUrl: process.env.QUEUE_URL,
      handleMessage: async data => {
        const payload: IQueueData = {
          MessageId: data.MessageId,
          message: JSON.parse(data.Body),
          receiptHandle: data.ReceiptHandle,
        };
        this.queueService.dequeue(payload);
      },
      sqs: new AWSClient.SQS(),
    });

    consumer.on('error', err => {
      console.error(err.message);
    });

    consumer.on('processing_error', err => {
      console.error(err.message);
    });
    /** starts the consumer */
    consumer.start();
  }
}

export interface IVideoEnqueuePayload {
    filepath: string;
    videoId: string;
}
export interface IQueueInsertParams {
    MessageBody: string;
    QueueUrl: string;
    MessageGroupId?: string;
    MessageDeduplicationId?: string;
}
export interface IQueueData {
    message: IVideoEnqueuePayload;
    receiptHandle: string;
    MessageId: string;
}
export interface IQueueDeleteParams {
    QueueUrl: string;
    ReceiptHandle: string;
}

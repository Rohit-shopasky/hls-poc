"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoUploadWorkerSqsConsumer = void 0;
const common_1 = require("@nestjs/common");
const sqs_consumer_1 = require("sqs-consumer");
const cloud_config_1 = require("../../config/cloud.config");
const videoProcess_queue_1 = require("../../queues/videoProcess.queue");
let VideoUploadWorkerSqsConsumer = class VideoUploadWorkerSqsConsumer {
    constructor(queueService) {
        this.queueService = queueService;
    }
    async consumer() {
        const consumer = sqs_consumer_1.Consumer.create({
            queueUrl: process.env.QUEUE_URL,
            handleMessage: async (data) => {
                const payload = {
                    MessageId: data.MessageId,
                    message: JSON.parse(data.Body),
                    receiptHandle: data.ReceiptHandle,
                };
                this.queueService.dequeue(payload);
            },
            sqs: new cloud_config_1.AWSClient.SQS(),
        });
        consumer.on('error', err => {
            console.error(err.message);
        });
        consumer.on('processing_error', err => {
            console.error(err.message);
        });
        consumer.start();
    }
};
VideoUploadWorkerSqsConsumer = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [videoProcess_queue_1.VideoProcessQueue])
], VideoUploadWorkerSqsConsumer);
exports.VideoUploadWorkerSqsConsumer = VideoUploadWorkerSqsConsumer;
//# sourceMappingURL=worker.service.js.map
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
exports.VideoProcessQueue = void 0;
const common_1 = require("@nestjs/common");
const cloud_config_1 = require("../config/cloud.config");
const videoConverter_1 = require("../util/videoConverter");
const videoUpload_service_1 = require("../videoUpload/videoUpload.service");
const constants_1 = require("../videoUpload/constants");
const sqs = new cloud_config_1.AWSClient.SQS({ apiVersion: '2012-11-05' });
let VideoProcessQueue = class VideoProcessQueue {
    constructor(videoConvertService, videoUploadService) {
        this.videoConvertService = videoConvertService;
        this.videoUploadService = videoUploadService;
        this.enqueue = async (data) => {
            const params = {
                MessageBody: JSON.stringify(data),
                QueueUrl: process.env.QUEUE_URL,
            };
            const result = await Promise.resolve(new Promise((resolve, reject) => {
                sqs.sendMessage(params, (err, data) => {
                    if (err) {
                        reject(new common_1.HttpException('Something went wrong', 500));
                    }
                    else {
                        resolve(data.MessageId);
                    }
                });
            }));
            return result;
        };
        this.dequeue = async (data) => {
            try {
                await this.videoConvertService.convertVideo(data.message.filepath, data.message.videoId);
                const isDeleted = await this.deleteData(data.receiptHandle);
                console.log('isProcess cleared from queue ', isDeleted);
                await this.videoUploadService.updateVideoStatus(data.message.videoId, constants_1.VideoUploadStatus.PROCESSED);
            }
            catch (error) {
                await this.videoUploadService.updateVideoStatus(data.message.videoId, constants_1.VideoUploadStatus.FAILED);
                throw error;
            }
        };
        this.deleteData = async (receiptHandle) => {
            try {
                const deleteParams = {
                    QueueUrl: process.env.QUEUE_URL,
                    ReceiptHandle: receiptHandle,
                };
                const result = await Promise.resolve(new Promise((resolve, reject) => {
                    sqs.deleteMessage(deleteParams, (err, data) => {
                        if (err) {
                            reject(new common_1.InternalServerErrorException({}, 'Something went wrong while clearing data from queue!'));
                        }
                        else {
                            resolve(true);
                        }
                    });
                }));
                if (result)
                    return true;
                else
                    return false;
            }
            catch (error) {
                throw new common_1.InternalServerErrorException(error);
            }
        };
    }
};
VideoProcessQueue = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [videoConverter_1.ConvertVideo,
        videoUpload_service_1.VideoUploadService])
], VideoProcessQueue);
exports.VideoProcessQueue = VideoProcessQueue;
//# sourceMappingURL=videoProcess.queue.js.map
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoUploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const videoProcess_queue_1 = require("../queues/videoProcess.queue");
const videoUpload_service_1 = require("./videoUpload.service");
let VideoUploadController = class VideoUploadController {
    constructor(videoQueueService, service) {
        this.videoQueueService = videoQueueService;
        this.service = service;
    }
    async uploadedFile(file) {
        try {
            const uploadVideoRecord = await this.service.uploadVideo(file.path);
            uploadVideoRecord.video_id = uploadVideoRecord.id;
            this.videoQueueService.enqueue({
                filepath: file.path,
                videoId: uploadVideoRecord.id,
            });
            return {
                status: 200,
                data: uploadVideoRecord,
                msg: 'ok',
            };
        }
        catch (error) {
            return {
                status: 500,
                data: {},
                msg: error.message || 'something went wrong!',
            };
        }
    }
    async getVideoUrlByVideoId(id) {
        try {
            const videoRecord = await this.service.getVideoByVideoId(id);
            return {
                status: 200,
                data: videoRecord,
                msg: 'ok',
            };
        }
        catch (error) {
            return {
                status: 500,
                data: {},
                msg: error.message || 'something went wrong!',
            };
        }
    }
    async getAllVideos(query) {
        try {
            const { skip, take } = query;
            const videoRecord = await this.service.getAllVideos(skip, take);
            return {
                status: 200,
                data: videoRecord,
                msg: 'ok',
            };
        }
        catch (error) {
            return {
                status: 500,
                data: {},
                msg: error.message || 'something went wrong!',
            };
        }
    }
    async deleteVideo(body) {
        try {
            const { id } = body;
            const videoRecord = await this.service.deleteVideo(id);
            return {
                status: 200,
                data: videoRecord,
                msg: 'ok',
            };
        }
        catch (error) {
            return {
                status: 500,
                data: {},
                msg: error.message || 'something went wrong!',
            };
        }
    }
};
__decorate([
    common_1.Post('upload'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('video')),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideoUploadController.prototype, "uploadedFile", null);
__decorate([
    common_1.Get('getVideoUrlByVideoId/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideoUploadController.prototype, "getVideoUrlByVideoId", null);
__decorate([
    common_1.Get('getAllVideos'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideoUploadController.prototype, "getAllVideos", null);
__decorate([
    common_1.Post('deleteVideo'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideoUploadController.prototype, "deleteVideo", null);
VideoUploadController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [videoProcess_queue_1.VideoProcessQueue,
        videoUpload_service_1.VideoUploadService])
], VideoUploadController);
exports.VideoUploadController = VideoUploadController;
//# sourceMappingURL=videoUpload.controller.js.map
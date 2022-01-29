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
exports.VideoUploadService = void 0;
const common_1 = require("@nestjs/common");
const videoUpload_respository_1 = require("./repository/videoUpload.respository");
let VideoUploadService = class VideoUploadService {
    constructor(repository) {
        this.repository = repository;
    }
    async uploadVideo(filePath) {
        try {
            return await this.repository.createUploadVideo(filePath);
        }
        catch (error) {
            throw error;
        }
    }
    async updateVideoStatus(videoId, status) {
        try {
            return await this.repository.updateVideoStatus(videoId, status);
        }
        catch (error) {
            throw error;
        }
    }
    async getVideoByVideoId(videoId) {
        try {
            return await this.repository.getVideoByVideoId(videoId);
        }
        catch (error) {
            throw error;
        }
    }
};
VideoUploadService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [videoUpload_respository_1.VideoUploadRepository])
], VideoUploadService);
exports.VideoUploadService = VideoUploadService;
//# sourceMappingURL=videoUpload.service.js.map
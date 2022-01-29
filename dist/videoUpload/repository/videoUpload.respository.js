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
exports.VideoUploadRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const videoUpload_schema_1 = require("../schema/videoUpload.schema");
const mongoose_2 = require("mongoose");
const constants_1 = require("../constants");
let VideoUploadRepository = class VideoUploadRepository {
    constructor(model) {
        this.model = model;
    }
    async getVideoByVideoId(videoId) {
        try {
            const response = await this.model.findOne({
                _id: videoId,
                is_deleted: false,
            });
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async createUploadVideo(filePath) {
        try {
            const preRecord = {
                filepath: filePath,
                upload_status: constants_1.VideoUploadStatus.QUEUED,
            };
            const record = new this.model(preRecord);
            const response = await record.save();
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async updateVideoStatus(videoId, status) {
        try {
            const fileUrl = status === constants_1.VideoUploadStatus.PROCESSED
                ? `https://${process.env.BUCKET_URL}.s3.ap-south-1.amazonaws.com//${videoId}/${videoId}-v.m3u8`
                : null;
            const updateVideoStatus = await this.model.findByIdAndUpdate({ _id: videoId }, {
                $set: {
                    upload_status: status,
                    file_url: fileUrl,
                },
            });
            return updateVideoStatus;
        }
        catch (error) {
            throw error;
        }
    }
    async getAllVideos(skip, take) {
        try {
            skip = typeof skip == 'undefined' ? 0 : skip;
            take = typeof take == 'undefined' ? 50 : take;
            const response = await this.model
                .find({
                is_deleted: false,
            })
                .skip(skip)
                .limit(take);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteVideo(id) {
        try {
            const response = await this.model.update({
                _id: id,
            }, {
                $set: {
                    is_deleted: true,
                },
            });
            return response.modifiedCount > 0 ? true : false;
        }
        catch (error) {
            throw error;
        }
    }
};
VideoUploadRepository = __decorate([
    __param(0, mongoose_1.InjectModel(videoUpload_schema_1.VideoUploadEntity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VideoUploadRepository);
exports.VideoUploadRepository = VideoUploadRepository;
//# sourceMappingURL=videoUpload.respository.js.map
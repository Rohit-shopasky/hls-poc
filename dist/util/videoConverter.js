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
exports.ConvertVideo = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const fs = require("fs");
const s3 = require("s3-node-client");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: 'v4',
});
const client = s3.createClient({
    maxAsyncS3: 20,
    s3RetryCount: 3,
    s3RetryDelay: 1000,
    multipartUploadThreshold: 20971520,
    multipartUploadSize: 15728640,
    s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
        region: process.env.AWS_REGION,
    },
});
let ConvertVideo = class ConvertVideo {
    constructor() { }
    async convertVideo(filepath, videoId) {
        return new Promise((resolve, rejects) => {
            fs.mkdirSync(`./files/converted/${videoId}`);
            ffmpeg.setFfmpegPath(ffmpegInstaller.path);
            ffmpeg(filepath, { timeout: 432000 })
                .addOptions([
                '-profile:v baseline',
                '-level 3.0',
                '-start_number 0',
                '-hls_time 10',
                '-hls_list_size 0',
                '-f hls',
            ])
                .output(`files/converted/${videoId}/${videoId}-v.m3u8`)
                .on('end', async () => {
                console.log('Video converted!');
                const params = {
                    localDir: `./files/converted/${videoId}`,
                    deleteRemoved: true,
                    s3Params: {
                        Bucket: process.env.BUCKET_URL,
                        Prefix: `/${videoId}`,
                    },
                };
                try {
                    await this.uploadHlsVideoToS3(params, filepath);
                    console.log('video uploaded to s3');
                    resolve(true);
                }
                catch (error) {
                    console.log('Something went wrong while uploading video to s3');
                    rejects(error);
                }
            })
                .on('error', error => {
                rejects(error);
            })
                .run();
        });
    }
    async uploadHlsVideoToS3(params, originalVideoFilePath) {
        return new Promise((resolve, rejects) => {
            const upLoader = client.uploadDir(params);
            upLoader.on('error', error => {
                rejects(error.stack);
            });
            upLoader.on('end', async () => {
                this.deleteVideo(params.localDir, originalVideoFilePath);
                resolve(true);
            });
        });
    }
    deleteVideo(dir, originalVideoFilePath) {
        try {
            fs.rmdirSync(dir, { recursive: true });
            fs.unlinkSync(originalVideoFilePath);
            console.log('converted files deleted from machine!');
            return true;
        }
        catch (error) {
            throw error;
        }
    }
};
ConvertVideo = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ConvertVideo);
exports.ConvertVideo = ConvertVideo;
//# sourceMappingURL=videoConverter.js.map
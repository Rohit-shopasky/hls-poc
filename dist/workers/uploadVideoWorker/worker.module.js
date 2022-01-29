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
exports.VideoUploadWorkerModule = void 0;
const common_1 = require("@nestjs/common");
const worker_service_1 = require("./worker.service");
const mongoose_1 = require("@nestjs/mongoose");
const db_config_1 = require("../../config/db.config");
const videoProcess_queue_1 = require("../../queues/videoProcess.queue");
const videoConverter_1 = require("../../util/videoConverter");
const videoUpload_module_1 = require("../../videoUpload/videoUpload.module");
let VideoUploadWorkerModule = class VideoUploadWorkerModule {
    constructor(workerSqsConsumer) {
        this.workerSqsConsumer = workerSqsConsumer;
    }
    onModuleInit() {
        this.workerSqsConsumer.consumer();
    }
};
VideoUploadWorkerModule = __decorate([
    common_1.Module({
        imports: [
            videoUpload_module_1.VideoUploadModule,
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: async () => {
                    return db_config_1.getDbCredentials();
                },
            }),
        ],
        providers: [worker_service_1.VideoUploadWorkerSqsConsumer, videoProcess_queue_1.VideoProcessQueue, videoConverter_1.ConvertVideo],
    }),
    __metadata("design:paramtypes", [worker_service_1.VideoUploadWorkerSqsConsumer])
], VideoUploadWorkerModule);
exports.VideoUploadWorkerModule = VideoUploadWorkerModule;
//# sourceMappingURL=worker.module.js.map
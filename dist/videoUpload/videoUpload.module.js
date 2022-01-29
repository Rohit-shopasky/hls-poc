"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoUploadModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("../config/multer.config");
const videoProcess_queue_1 = require("../queues/videoProcess.queue");
const videoUpload_controller_1 = require("./videoUpload.controller");
const mongoose_1 = require("@nestjs/mongoose");
const videoUpload_schema_1 = require("./schema/videoUpload.schema");
const videoUpload_respository_1 = require("./repository/videoUpload.respository");
const videoUpload_service_1 = require("./videoUpload.service");
const videoConverter_1 = require("../util/videoConverter");
let VideoUploadModule = class VideoUploadModule {
};
VideoUploadModule = __decorate([
    common_1.Module({
        imports: [
            platform_express_1.MulterModule.register(multer_config_1.multerOptions),
            mongoose_1.MongooseModule.forFeature([
                { name: videoUpload_schema_1.VideoUploadEntity.name, schema: videoUpload_schema_1.VideoUploadEntitySchema },
            ]),
        ],
        controllers: [videoUpload_controller_1.VideoUploadController],
        providers: [
            videoProcess_queue_1.VideoProcessQueue,
            videoUpload_service_1.VideoUploadService,
            videoUpload_respository_1.VideoUploadRepository,
            videoConverter_1.ConvertVideo,
        ],
        exports: [videoUpload_service_1.VideoUploadService, videoUpload_respository_1.VideoUploadRepository],
    })
], VideoUploadModule);
exports.VideoUploadModule = VideoUploadModule;
//# sourceMappingURL=videoUpload.module.js.map
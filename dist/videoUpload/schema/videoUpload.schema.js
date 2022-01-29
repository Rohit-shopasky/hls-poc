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
exports.VideoUploadEntitySchema = exports.VideoUploadEntity = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const constants_1 = require("../../common/constants");
let VideoUploadEntity = class VideoUploadEntity {
};
__decorate([
    mongoose_1.Prop({ type: String, required: true }),
    __metadata("design:type", String)
], VideoUploadEntity.prototype, "filepath", void 0);
__decorate([
    mongoose_1.Prop({ type: String, required: true }),
    __metadata("design:type", String)
], VideoUploadEntity.prototype, "upload_status", void 0);
__decorate([
    mongoose_1.Prop({ type: String }),
    __metadata("design:type", String)
], VideoUploadEntity.prototype, "file_url", void 0);
__decorate([
    mongoose_1.Prop({ default: false }),
    __metadata("design:type", Boolean)
], VideoUploadEntity.prototype, "is_deleted", void 0);
VideoUploadEntity = __decorate([
    mongoose_1.Schema({
        collection: 'video_upload',
        timestamps: constants_1.MONGODB_TIMESTAMP_FIELD,
    })
], VideoUploadEntity);
exports.VideoUploadEntity = VideoUploadEntity;
exports.VideoUploadEntitySchema = mongoose_1.SchemaFactory.createForClass(VideoUploadEntity);
//# sourceMappingURL=videoUpload.schema.js.map
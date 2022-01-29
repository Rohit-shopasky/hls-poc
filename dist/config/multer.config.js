"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOptions = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../common/constants");
const multer_1 = require("multer");
exports.multerOptions = {
    limits: {
        fileSize: constants_1.MAX_UPLOAD_VIDEO_FILE_SIZE,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(mp4|flv)$/)) {
            cb(null, true);
        }
        else {
            cb(new common_1.HttpException('Only mp4 and flv files are allowed', 400), false);
        }
    },
    storage: multer_1.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './files');
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.mp4');
        },
    }),
};
//# sourceMappingURL=multer.config.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSClient = void 0;
const AWS = require("aws-sdk");
const common_1 = require("@nestjs/common");
const region = process.env.AWS_REGION;
AWS.config.update({
    region,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
});
AWS.config.getCredentials((err) => {
    if (err) {
        const error = 'Aws connection error. Msg: ' + err.message;
        throw new common_1.InternalServerErrorException(error);
    }
});
exports.AWSClient = AWS;
//# sourceMappingURL=cloud.config.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const core_1 = require("@nestjs/core");
const worker_module_1 = require("./worker.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(worker_module_1.VideoUploadWorkerModule);
    await app.listen(process.env.VIDEO_WORKER_PORT);
    console.log('video worker running on ', process.env.VIDEO_WORKER_PORT);
}
bootstrap();
//# sourceMappingURL=worker.main.js.map
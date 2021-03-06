"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(process.env.MAIN_PROCESS_PORT);
    console.log('main process running on ', process.env.MAIN_PROCESS_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbCredentials = void 0;
exports.getDbCredentials = () => {
    return {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        uri: ['development', 'production', 'staging'].includes(process.env.NODE_ENV)
            ? process.env.SERVER_MONGODB
            : process.env.LOCAL_MONGODB,
    };
};
//# sourceMappingURL=db.config.js.map
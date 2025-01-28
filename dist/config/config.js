"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var joi_1 = __importDefault(require("joi"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
var envVarsSchema = joi_1.default.object().keys({
    NODE_ENV: joi_1.default.string().required(),
    NODE_ENV_TESTING: joi_1.default.boolean().required(),
    PORT: joi_1.default.number().default(8000),
    ALLOW_TEST_CORS: joi_1.default.boolean().required(),
    JWT_SECRET: joi_1.default.string().required().description("JWT secret key"),
    JWT_REFRESH_SECRET: joi_1.default.string()
        .required()
        .description("JWT Refresh secret key"),
    RESET_PASSWORD_SECRET: joi_1.default.string()
        .required()
        .description("The secret used to generate a token on password forgot "),
    RESET_PASSWORD_EXPIRATION_TIME: joi_1.default.string()
        .required()
        .description("Forgot password token expiration time"),
    JWT_ACCESS_EXPIRATION_MINUTES: joi_1.default.number()
        .required()
        .description("minutes after which access tokens expire"),
    JWT_ACCESS_EXPIRATION_DAYS: joi_1.default.number()
        .required()
        .description("days after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: joi_1.default.number()
        .required()
        .description("days after which refresh tokens expire"),
    DATABASE_URL: joi_1.default.string().description("The url needed for database connection"),
});
var _a = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env), envVars = _a.value, error = _a.error;
if (error) {
    console.log(error);
    // throw new Error(`Config validation error: ${error.message}`);
}
exports.default = {
    env: envVars.NODE_ENV,
    isTestingEnv: envVars.NODE_ENV_TESTING,
    jwt: {
        secret: envVars.JWT_SECRET,
        refreshSecret: envVars.JWT_REFRESH_SECRET,
        accessExpirationDays: envVars.JWT_ACCESS_EXPIRATION_DAYS,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordSecret: envVars.RESET_PASSWORD_SECRET,
        resetPasswordExpirationTime: envVars.RESET_PASSWORD_EXPIRATION_TIME,
    },
    database: {
        url: envVars.DATABASE_URL,
    },
    allowTestCors: envVars.ALLOW_TEST_CORS,
};
//# sourceMappingURL=config.js.map
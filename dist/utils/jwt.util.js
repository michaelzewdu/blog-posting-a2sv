"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../config/config"));
var jsonwebtoken_1 = require("jsonwebtoken");
var moment_1 = __importDefault(require("moment"));
/**
 * Generate token
 * @param {{ id: string; role: string }} user
 * @param {Moment} expires
 * @param {string} secret
 * @returns {string}
 */
var generateToken = function (user, expires, secret) {
    if (secret === void 0) { secret = config_1.default.jwt.secret; }
    var payload = {
        sub: user.id,
        role: user.role,
        email: user.email,
        iat: (0, moment_1.default)().unix(),
        exp: expires.unix(),
    };
    return (0, jsonwebtoken_1.sign)(payload, secret);
};
/**
 * Generate auth tokens
 * @param {authTokens} options
 * @returns {{ accessToken: string; refreshToken: string }}
 */
var generateAuthTokens = function (options) {
    var accessTokenExpires = (0, moment_1.default)().add(config_1.default.jwt.accessExpirationDays, "days");
    var refreshTokenExpires = (0, moment_1.default)().add(config_1.default.jwt.refreshExpirationDays, "days");
    var accessToken = generateToken(options, accessTokenExpires);
    var refreshToken = generateToken(options, refreshTokenExpires, config_1.default.jwt.refreshSecret);
    return { accessToken: accessToken, refreshToken: refreshToken };
};
/**
 * Verfiy auth tokens
 * @param {string} token
 * @returns {JwtTokenPayload | undefined}
 */
var verifyAuthTokens = function (token, secretKey) {
    try {
        var decoded = ((0, jsonwebtoken_1.verify)(token, secretKey !== null && secretKey !== void 0 ? secretKey : config_1.default.jwt.secret));
        return decoded;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.default = {
    generateToken: generateToken,
    verifyAuthTokens: verifyAuthTokens,
    generateAuthTokens: generateAuthTokens,
};
//# sourceMappingURL=jwt.util.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../config/config"));
var errorResponse_1 = require("../types/errorResponse");
var http_status_1 = __importDefault(require("http-status"));
function successHandler(res, data, statusCode) {
    res.status(statusCode || http_status_1.default.OK).json(data);
}
// Success handler to send cookies
function successHandlerLogin(res, data, statusCode) {
    res
        .cookie("accessToken", data.accessToken, {
        httpOnly: true,
        sameSite: config_1.default.isTestingEnv ? "none" : "strict",
        secure: config_1.default.isTestingEnv
            ? true
            : config_1.default.env === "production" && !config_1.default.allowTestCors,
        expires: new Date(Date.now() + config_1.default.jwt.accessExpirationDays * 24 * 60 * 60 * 1000),
    })
        .cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        sameSite: config_1.default.isTestingEnv ? "none" : "strict",
        secure: config_1.default.isTestingEnv
            ? true
            : config_1.default.env === "production" && !config_1.default.allowTestCors,
        expires: new Date(Date.now() + config_1.default.jwt.refreshExpirationDays * 24 * 60 * 60 * 1000),
    })
        .status(statusCode || http_status_1.default.OK)
        .json({ data: data.user, error: null });
}
function errorHandler(res, error) {
    var message;
    var generic = "Something went wrong";
    if ((0, errorResponse_1.instanceOfIErrorResponse)(error)) {
        message = error.errorMessage || generic;
        // logger.error(message);
        console.error(message);
    }
    else {
        message = generic;
        // logger.error(message);
        console.error(message);
    }
    var statusCode = (error === null || error === void 0 ? void 0 : error.statusCode) || 500;
    res.locals.error = error;
    res.status(statusCode).json({
        data: null,
        error: {
            statusCode: statusCode,
            errorMessage: message,
        },
    });
}
function resultHandler(func) {
    var _this = this;
    var wrapped = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, func(request, response)];
                case 1:
                    result = _a.sent();
                    if (result.error) {
                        return [2 /*return*/, errorHandler(response, result.error)];
                    }
                    if (result.isLogin) {
                        return [2 /*return*/, successHandlerLogin(response, result.data, result.statusCode || http_status_1.default.OK)];
                    }
                    return [2 /*return*/, successHandler(response, { data: result.data, error: null }, result.statusCode || http_status_1.default.OK)];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, errorHandler(response, error_1)];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return wrapped;
}
exports.default = {
    resultHandler: resultHandler,
    errorHandler: errorHandler,
};
//# sourceMappingURL=resultHandler.util.js.map
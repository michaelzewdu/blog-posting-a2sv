"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newControllerData = exports.newControllerError = void 0;
var errorResponse_1 = require("./errorResponse");
function newControllerError(errorMessage, statusCode) {
    return {
        error: (0, errorResponse_1.newError)(errorMessage, statusCode),
        data: null,
    };
}
exports.newControllerError = newControllerError;
function newControllerData(data, statusCode, isLogin) {
    return {
        isLogin: isLogin,
        statusCode: statusCode,
        error: null,
        data: data,
    };
}
exports.newControllerData = newControllerData;
//# sourceMappingURL=controllerResult.js.map
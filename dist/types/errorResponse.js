"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newError = exports.instanceOfIErrorResponse = void 0;
function instanceOfIErrorResponse(object) {
    if (typeof object === "string") {
        return false;
    }
    return "errorMessage" in object;
}
exports.instanceOfIErrorResponse = instanceOfIErrorResponse;
function newError(errorMessage, statusCode) {
    return {
        statusCode: statusCode || 500,
        errorMessage: errorMessage,
    };
}
exports.newError = newError;
//# sourceMappingURL=errorResponse.js.map
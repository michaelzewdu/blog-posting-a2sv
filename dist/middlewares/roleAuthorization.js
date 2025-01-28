"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoleAuthorization = void 0;
var index_1 = require("../utils/index");
var http_status_1 = __importDefault(require("http-status"));
function checkRoleAuthorization(authorizedRoles) {
    return function (req, res, next) {
        try {
            if (authorizedRoles.includes(res.locals.role)) {
                next();
            }
            else {
                return index_1.handlerUtil.errorHandler(res, {
                    errorMessage: "You don't have sufficient permissions to make this request.",
                    statusCode: http_status_1.default.FORBIDDEN,
                });
            }
        }
        catch (e) {
            return index_1.handlerUtil.errorHandler(res, {
                errorMessage: e === null || e === void 0 ? void 0 : e.toString(),
                statusCode: http_status_1.default.FORBIDDEN,
            });
        }
    };
}
exports.checkRoleAuthorization = checkRoleAuthorization;
//# sourceMappingURL=roleAuthorization.js.map
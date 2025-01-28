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
var config_1 = __importDefault(require("../../config/config"));
var jwt_util_1 = __importDefault(require("../../utils/jwt.util"));
// import { sendMail } from "@/utils/mailService";
var controllerResult_1 = require("../../types/controllerResult");
var index_1 = require("../../utils/index");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var http_status_1 = __importDefault(require("http-status"));
var constants_1 = require("./constants");
var service_1 = __importDefault(require("./service"));
var register = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var exists, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, service_1.default.getUserByEmail(data.email)];
            case 1:
                exists = _a.sent();
                if (exists)
                    return [2 /*return*/, (0, controllerResult_1.newControllerError)("User already exists", http_status_1.default.FORBIDDEN)];
                return [4 /*yield*/, service_1.default.createUser(data)];
            case 2:
                _a.sent();
                return [2 /*return*/, (0, controllerResult_1.newControllerData)({}, http_status_1.default.CREATED)];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, (0, controllerResult_1.newControllerError)(error_1.message, http_status_1.default.INTERNAL_SERVER_ERROR)];
            case 4: return [2 /*return*/];
        }
    });
}); };
var login = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var user, passMatch, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, service_1.default.getUserByEmail(body.email)];
            case 1:
                user = _a.sent();
                if (!user || user.isDeleted === true)
                    return [2 /*return*/, (0, controllerResult_1.newControllerError)("username or password is incorrect", http_status_1.default.BAD_REQUEST)];
                return [4 /*yield*/, user.comparePassword(body.password)];
            case 2:
                passMatch = _a.sent();
                if (!passMatch)
                    return [2 /*return*/, (0, controllerResult_1.newControllerError)("username or password is incorrect", http_status_1.default.BAD_REQUEST)];
                token = index_1.tokenService.generateAuthTokens({
                    id: user.id,
                    role: user.role,
                    email: user.email
                });
                return [2 /*return*/, (0, controllerResult_1.newControllerData)({
                        user: {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            role: user.role,
                            email: user.email,
                            avatar: user.avatar,
                            branch: user.branchId,
                        },
                        accessToken: token.accessToken,
                        refreshToken: token.refreshToken,
                    }, http_status_1.default.OK, true)];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, (0, controllerResult_1.newControllerError)(error_2.message, http_status_1.default.INTERNAL_SERVER_ERROR)];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getAllUsers = function (role, page, limit) { return __awaiter(void 0, void 0, void 0, function () {
    var offset, users, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                offset = ((page > 0 ? page : 1) - 1) * limit;
                return [4 /*yield*/, service_1.default.getAllUsers({ page: page, limit: limit, offset: offset })];
            case 1:
                users = _a.sent();
                return [2 /*return*/, (0, controllerResult_1.newControllerData)({
                        users: users,
                    }, http_status_1.default.OK)];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, (0, controllerResult_1.newControllerError)(error_3.message, http_status_1.default.INTERNAL_SERVER_ERROR)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var update = function (locals, body) { return __awaiter(void 0, void 0, void 0, function () {
    var error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (locals.role === constants_1.Users.DATA_ENTRY)
                    body.email = undefined;
                return [4 /*yield*/, service_1.default.updateUser(locals.sub, body)];
            case 1:
                _a.sent();
                return [2 /*return*/, (0, controllerResult_1.newControllerData)({}, http_status_1.default.RESET_CONTENT)];
            case 2:
                error_4 = _a.sent();
                return [2 /*return*/, (0, controllerResult_1.newControllerError)(error_4.message, http_status_1.default.INTERNAL_SERVER_ERROR)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateAsAdmin = function (locals, body) { return __awaiter(void 0, void 0, void 0, function () {
    var error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, service_1.default.updateUser(locals.sub, body)];
            case 1:
                _a.sent();
                return [2 /*return*/, (0, controllerResult_1.newControllerData)({}, http_status_1.default.RESET_CONTENT)];
            case 2:
                error_5 = _a.sent();
                return [2 /*return*/, (0, controllerResult_1.newControllerError)(error_5.message, http_status_1.default.INTERNAL_SERVER_ERROR)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updatePassword = function (locals, body) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, passMatch, _a, _b, _c, error_6;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 6, , 7]);
                return [4 /*yield*/, service_1.default.getUserById(locals.sub)];
            case 1:
                userData = _e.sent();
                if (!userData)
                    return [2 /*return*/, (0, controllerResult_1.newControllerError)("User not found", http_status_1.default.NOT_FOUND)];
                if (!(locals.role === constants_1.Users.DATA_ENTRY)) return [3 /*break*/, 3];
                if (!body.oldPassword)
                    return [2 /*return*/, (0, controllerResult_1.newControllerError)("Old password is incorrect", http_status_1.default.BAD_REQUEST)];
                return [4 /*yield*/, userData.comparePassword(body.oldPassword)];
            case 2:
                passMatch = _e.sent();
                if (!passMatch)
                    return [2 /*return*/, (0, controllerResult_1.newControllerError)("Old password is incorrect", http_status_1.default.BAD_REQUEST)];
                _e.label = 3;
            case 3:
                _b = (_a = service_1.default).updateUser;
                _c = [locals.sub];
                _d = {};
                return [4 /*yield*/, bcryptjs_1.default.hash(body.newPassword, 10)];
            case 4: return [4 /*yield*/, _b.apply(_a, _c.concat([(_d.password = _e.sent(),
                        _d)]))];
            case 5:
                _e.sent();
                return [2 /*return*/, (0, controllerResult_1.newControllerData)({}, http_status_1.default.NO_CONTENT)];
            case 6:
                error_6 = _e.sent();
                return [2 /*return*/, (0, controllerResult_1.newControllerError)(error_6.message, http_status_1.default.INTERNAL_SERVER_ERROR)];
            case 7: return [2 /*return*/];
        }
    });
}); };
var deleteUser = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, service_1.default.getUserById(userId)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, (0, controllerResult_1.newControllerError)("User to delete not found", http_status_1.default.NOT_FOUND)];
                return [4 /*yield*/, service_1.default.deleteUserById(userId)];
            case 2:
                _a.sent();
                return [2 /*return*/, (0, controllerResult_1.newControllerData)({}, http_status_1.default.RESET_CONTENT)];
            case 3:
                error_7 = _a.sent();
                return [2 /*return*/, (0, controllerResult_1.newControllerError)(error_7.message, http_status_1.default.INTERNAL_SERVER_ERROR)];
            case 4: return [2 /*return*/];
        }
    });
}); };
// const forgotPassword = async (userEmail: string) => {
// 	try {
// 		const user: IUser | null = await userService.getUserByEmail(userEmail);
// 		if (!user) return newControllerError("This user does not exist", 400);
// 		const user_token = jwtUtil.generateToken(
// 			{ id: user.email, role: user.role, branch: user.branchId.id },
// 			moment().add(config.jwt.resetPasswordExpirationTime, "seconds"),
// 			config.jwt.resetPasswordSecret,
// 		);
// 		// implement mail
// 		return newControllerData("Sent mail", 200);
// 	} catch (error: any) {
// 		return newControllerError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
// 	}
// };
var resetPasswordController = function (token, newPassword) { return __awaiter(void 0, void 0, void 0, function () {
    var verify, updatedUser, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                verify = jwt_util_1.default.verifyAuthTokens(token, config_1.default.jwt.resetPasswordSecret);
                if (!verify || !verify.sub)
                    return [2 /*return*/, (0, controllerResult_1.newControllerError)("Token has expired or is invalid", 400)];
                return [4 /*yield*/, service_1.default.resetPassword(newPassword, verify.sub)];
            case 1:
                updatedUser = _a.sent();
                if (!updatedUser)
                    return [2 /*return*/, (0, controllerResult_1.newControllerError)("An error occurred", 400)];
                return [2 /*return*/, (0, controllerResult_1.newControllerData)({ updatedUser: updatedUser }, http_status_1.default.OK)];
            case 2:
                error_8 = _a.sent();
                return [2 /*return*/, (0, controllerResult_1.newControllerError)(error_8.message, http_status_1.default.INTERNAL_SERVER_ERROR)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var refreshSession = function (refreshToken) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token;
    return __generator(this, function (_a) {
        try {
            user = index_1.tokenService.verifyAuthTokens(refreshToken, config_1.default.jwt.refreshSecret);
            token = index_1.tokenService.generateAuthTokens({
                id: user.id,
                role: user.role,
                email: user.email,
            });
            return [2 /*return*/, (0, controllerResult_1.newControllerData)({
                    accessToken: token.accessToken,
                }, http_status_1.default.OK)];
        }
        catch (error) {
            return [2 /*return*/, (0, controllerResult_1.newControllerError)(error.message, http_status_1.default.UNAUTHORIZED)];
        }
        return [2 /*return*/];
    });
}); };
exports.default = {
    register: register,
    login: login,
    getAllUsers: getAllUsers,
    refreshSession: refreshSession,
    update: update,
    updateAsAdmin: updateAsAdmin,
    updatePassword: updatePassword,
    deleteUser: deleteUser,
    // forgotPassword,
    resetPasswordController: resetPasswordController,
};
//# sourceMappingURL=controller.js.map
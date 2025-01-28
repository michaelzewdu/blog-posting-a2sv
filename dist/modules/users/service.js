"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var mongoose_1 = __importDefault(require("mongoose"));
var constants_1 = require("./constants");
var schema_1 = require("./schema");
/**
 * Create a user
 * @param {IUser} data
 * @returns {Promise<IUserModel>}
 */
var createUser = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, schema_1.userModel.create(__assign({}, data))];
    });
}); };
/**
 * Get all users
 * @param {{ limit: number; page: number; offset: number }} options
 * @returns {Promise<PaginateResult<IUserModel[]>>}
 */
var getAllUsers = function (options_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([options_1], args_1, true), void 0, function (options, withAdmin) {
        var filter;
        var _a, _b, _c, _d;
        if (withAdmin === void 0) { withAdmin = false; }
        return __generator(this, function (_e) {
            filter = !withAdmin
                ? {
                    role: {
                        $nin: [
                            constants_1.Users.ADMIN,
                        ],
                    },
                }
                : null;
            return [2 /*return*/, schema_1.userModel.paginate(filter, {
                    sort: { createdAt: -1 },
                    page: (_b = (_a = options === null || options === void 0 ? void 0 : options.page) !== null && _a !== void 0 ? _a : 1 - 1) !== null && _b !== void 0 ? _b : 0,
                    populate: ["branchId"],
                    limit: (_c = options === null || options === void 0 ? void 0 : options.limit) !== null && _c !== void 0 ? _c : 10,
                    offset: (_d = options === null || options === void 0 ? void 0 : options.offset) !== null && _d !== void 0 ? _d : 0,
                })];
        });
    });
};
/**
 * Get user by id
 * @param {string} id
 * @returns {Promise<IUserModel | null>}
 */
var getUserById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, schema_1.userModel
                .findOne({ _id: new mongoose_1.default.Types.ObjectId(id) })];
    });
}); };
/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<IUserModel | null>}
 */
var getUserByEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, schema_1.userModel.findOne({ email: email }).populate("branchId")];
    });
}); };
/**
 * Update user
 * @param {string} id
 * @param {IUser} user
 * @returns {Promise<IUserModel | null>}
 */
var updateUser = function (id, user) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, schema_1.userModel.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(id) }, user, { new: true })];
    });
}); };
/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<IUserModel>}
 */
var deleteUserById = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, schema_1.userModel.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(userId) }, { isDeleted: true }, { new: true })];
    });
}); };
var resetPassword = function (newPassword, userEmail) { return __awaiter(void 0, void 0, void 0, function () {
    var hashedPassword, updatedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bcryptjs_1.default.hash(newPassword, 10)];
            case 1:
                hashedPassword = _a.sent();
                return [4 /*yield*/, schema_1.userModel.findOneAndUpdate({ email: userEmail }, { password: hashedPassword })];
            case 2:
                updatedUser = _a.sent();
                if (!updatedUser)
                    return [2 /*return*/, null];
                return [2 /*return*/, true];
        }
    });
}); };
exports.default = {
    createUser: createUser,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    getUserByEmail: getUserByEmail,
    updateUser: updateUser,
    deleteUserById: deleteUserById,
    resetPassword: resetPassword,
};
//# sourceMappingURL=service.js.map
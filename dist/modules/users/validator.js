"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.deleteUser = exports.updateUserPassword = exports.updateUser = exports.getAllSchema = exports.loginSchema = exports.createUserSchema = exports.isPhone = void 0;
var joi_1 = __importDefault(require("joi"));
var constants_1 = require("./constants");
/* const password: Joi.CustomValidator<string> = (value, helpers) => {
  if (value.length < 8) {
    return helpers.error('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.error('password must contain at least 1 letter and 1 number');
  }
  return value;
}; */
var isPhone = function (address) {
    var error = joi_1.default.string()
        .regex(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
        .validate(address).error;
    if (error)
        return false;
    return true;
};
exports.isPhone = isPhone;
var createUserSchema = {
    body: joi_1.default.object().keys({
        firstName: joi_1.default.string()
            .regex(/^\p{L}*$/u)
            .required(),
        lastName: joi_1.default.string()
            .regex(/^\p{L}*$/u)
            .required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required().min(8),
        avatar: joi_1.default.string().optional().allow(null),
        role: (_a = joi_1.default.string())
            .valid.apply(_a, Object.values(constants_1.Users)).optional(),
        branchId: joi_1.default.string().required(),
    }),
};
exports.createUserSchema = createUserSchema;
var loginSchema = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    }),
};
exports.loginSchema = loginSchema;
var forgotPasswordSchema = {
    query: joi_1.default.object().keys({
        email: joi_1.default.string().email(),
    }),
};
exports.forgotPasswordSchema = forgotPasswordSchema;
var resetPasswordSchema = {
    query: joi_1.default.object().keys({
        token: joi_1.default.string().required(),
    }),
    body: joi_1.default.object().keys({
        newPassword: joi_1.default.string().required(),
    }),
};
exports.resetPasswordSchema = resetPasswordSchema;
var getAllSchema = {
    query: joi_1.default.object().keys({
        page: joi_1.default.number().required(),
        limit: joi_1.default.number().required(),
    }),
};
exports.getAllSchema = getAllSchema;
var updateUser = {
    body: joi_1.default.object().keys({
        firstName: joi_1.default.string()
            .regex(/^\p{L}*$/u)
            .optional(),
        lastName: joi_1.default.string()
            .regex(/^\p{L}*$/u)
            .optional(),
        email: joi_1.default.string().optional(),
        avatar: joi_1.default.string().optional().allow(null),
    }),
};
exports.updateUser = updateUser;
var updateUserPassword = {
    body: joi_1.default.object().keys({
        oldPassword: joi_1.default.string().optional(),
        newPassword: joi_1.default.string().required(),
    }),
};
exports.updateUserPassword = updateUserPassword;
var deleteUser = {
    params: joi_1.default.object().keys({
        userId: joi_1.default.string().required(),
    }),
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=validator.js.map
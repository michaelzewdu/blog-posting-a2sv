"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
var express_joi_validation_1 = require("express-joi-validation");
exports.validator = (0, express_joi_validation_1.createValidator)({
    // This options forces validation to pass any errors the express
    // error handler instead of generating a 400 error
    passError: true,
});
//# sourceMappingURL=baseValidator.util.js.map
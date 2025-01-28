"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var defaultRoutes = [
    {
        path: "/auth",
        route: authRouter
    },
    {
        path: "/users",
        route: userRouter
    }
];
//# sourceMappingURL=index.js.map
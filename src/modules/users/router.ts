import config from "../../config/config";
import { checkRoleAuthorization } from "../../middlewares/roleAuthorization";
import { validator } from "../../utils/baseValidator.util";
import { handlerUtil } from "../../utils/index";
import express, { type Request, type Response } from "express";
import httpStatus from "http-status";
import { Users } from "./constants";
import userController from "./controller";
import {
	createUserSchema,
	deleteUser,
	forgotPasswordSchema,
	getAllSchema,
	loginSchema,
	resetPasswordSchema,
	updateUser,
	updateUserPassword,
} from "./validator";

const authRouter = express.Router();
const userRouter = express.Router();

/**
 * Auth routes
 */
authRouter.post(
	"/register",
	checkRoleAuthorization([
		Users.ADMIN,
        Users.DATA_ENTRY
	]),
	validator.body(createUserSchema.body),
	handlerUtil.resultHandler(async (req: Request, res: Response) => {

			req.body.role = undefined;
		return await userController.register({
			...req.body,
			role: req.body.role ? req.body.role : "DATA_ENTRY",
		});
	}),
);

authRouter.post(
	"/login",
	validator.body(loginSchema.body),
	handlerUtil.resultHandler(async (req: Request) => {
		return await userController.login(req.body);
	}),
);

authRouter.post("/logout", async (_req: Request, res: Response) => {
	res.clearCookie("accessToken");
	res.clearCookie("refreshToken");
	return res.status(httpStatus.NO_CONTENT).send();
});

authRouter.get("/refresh", async (req: Request, res: Response) => {
	const token = await userController.refreshSession(req.cookies.refreshToken);
	if (token.data)
		return res
			.cookie("accessToken", token.data.accessToken, {
				httpOnly: true,
				sameSite: config.isTestingEnv ? "none" : "strict",
				secure: config.isTestingEnv
					? true
					: config.env === "production" && !config.allowTestCors,
				expires: new Date(
					Date.now() + config.jwt.accessExpirationDays * 24 * 60 * 60 * 1000,
				),
			})
			.status(httpStatus.OK)
			.json({ data: null, error: null });
	return res
		.status(httpStatus.UNAUTHORIZED)
		.json({ data: null, error: token.error });
});

/**
 * Forgot password
 */
// userRouter.post(
// 	"/forgot-password",
// 	validator.query(forgotPasswordSchema.query),
// 	handlerUtil.resultHandler(async (req: Request) => {
// 		return await userController.forgotPassword(String(req.query.email));
// 	}),
// );

/**
 * Reset password
 */
userRouter.post(
	"/reset-password",
	validator.body(resetPasswordSchema.body),
	validator.query(resetPasswordSchema.query),
	handlerUtil.resultHandler(async (req: Request) => {
		return await userController.resetPasswordController(
			String(req.query.token),
			req.body.newPassword,
		);
	}),
);

/**
 * User routes
 */
// userRouter.get(
// 	"/all",
// 	checkRoleAuthorization([
// 		Users.ADMIN,
// 	]),
// 	validator.query(getAllSchema.query),
// 	handlerUtil.resultHandler(async (req: Request, res: Response) => {
// 		return await userController.getAllUsers(
// 			res.locals.role,
// 			Number(req.query.page),
// 			Number(req.query.limit),
// 		);
// 	}),
// );

userRouter.put(
	"/update",
	checkRoleAuthorization([
		Users.ADMIN,
	]),
	validator.body(updateUser.body),
	handlerUtil.resultHandler(async (req: Request, res: Response) => {
		return await userController.update(
			{ sub: res.locals.sub, role: res.locals.role },
			req.body,
		);
	}),
);

userRouter.put(
	"/update-password",
	validator.body(updateUserPassword.body),
	handlerUtil.resultHandler(async (req: Request, res: Response) => {
		return await userController.update(
			{ sub: res.locals.sub, role: res.locals.role },
			req.body,
		);
	}),
);

userRouter.delete(
	"/:userId",
	checkRoleAuthorization([
		Users.ADMIN,
	]),
	validator.params(deleteUser.params),
	handlerUtil.resultHandler(async (req: Request) => {
		return await userController.deleteUser(req.params.userId);
	}),
);

export { authRouter, userRouter };

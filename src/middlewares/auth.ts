import config from "../config/config";
import { handlerUtil, tokenService } from "../utils/index";
import type { NextFunction, Request, Response } from "express";


export const noAuthenticationRequiredRoutes = [
	"/v1/auth/login",
	"/v1/auth/refresh",
	"/v1/captcha/verify",
	"/v1/interested-applicant/register",
	"/v1/users/reset-password",
	"/v1/users/forgot-password",
];

const getAuthToken = (req: Request, res: Response, next: NextFunction) => {
	if (req.cookies.accessToken) {
		res.locals.token = req.cookies.accessToken;
	} else {
		res.locals.token = null;
	}
	next();
};

export const isAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	getAuthToken(req, res, async () => {
		try {
			if (noAuthenticationRequiredRoutes.includes(req.path)) {
				return next();
			}
			if (config.env === "development") {
				res.locals = {
					sub: "666aeb90f771d02ecc4fe6ee",
					role: "SUPER_ADMIN_HORRA",
					branch: "667c7b9479a64438dbe4f69c",
				};
				return next();
			}
			const user = tokenService.verifyAuthTokens(res.locals.token);
			res.locals = {
				role: user.role,
				sub: user.sub as string,
				branch: user.branch,
			};
			return next();
		} catch (e) {
			return handlerUtil.errorHandler(res, {
				errorMessage: "You are not authorized to make this request.",
				statusCode: 401,
			});
		}
	});
};

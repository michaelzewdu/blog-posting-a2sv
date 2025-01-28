import config from "../config/config";
import type { ILogin } from "../modules/users/model";
import type { IControllerResult } from "../types/controllerResult";
import {
	type IErrorResponse,
	instanceOfIErrorResponse,
} from "../types/errorResponse";
import type { Request, Response } from "express";
import httpStatus from "http-status";

function successHandler<T>(
	res: Response,
	data: T | T[] | null,
	statusCode?: number,
): void {
	res.status(statusCode || httpStatus.OK).json(data);
}

// Success handler to send cookies
function successHandlerLogin(
	res: Response,
	data: ILogin,
	statusCode?: number,
): void {
	res
		.cookie("accessToken", data.accessToken, {
			httpOnly: true,
			sameSite: config.isTestingEnv ? "none" : "strict",
			secure: config.isTestingEnv
				? true
				: config.env === "production" && !config.allowTestCors,
			expires: new Date(
				Date.now() + config.jwt.accessExpirationDays * 24 * 60 * 60 * 1000,
			),
		})
		.cookie("refreshToken", data.refreshToken, {
			httpOnly: true,
			sameSite: config.isTestingEnv ? "none" : "strict",
			secure: config.isTestingEnv
				? true
				: config.env === "production" && !config.allowTestCors,
			expires: new Date(
				Date.now() + config.jwt.refreshExpirationDays * 24 * 60 * 60 * 1000,
			),
		})
		.status(statusCode || httpStatus.OK)
		.json({ data: data.user, error: null });
}

function errorHandler(res: Response, error: IErrorResponse | any): void {
	let message: string;
	const generic = "Something went wrong";
	if (instanceOfIErrorResponse(error)) {
		message = error.errorMessage || generic;
		// logger.error(message);
        console.error(message);
	} else {
		message = generic;
		// logger.error(message);
        console.error(message);
	}
	const statusCode = error?.statusCode || 500;
	res.locals.error = error;
	res.status(statusCode).json({
		data: null,
		error: {
			statusCode,
			errorMessage: message,
		},
	});
}

function resultHandler(
	func: (
		request: Request,
		response: Response,
	) => Promise<IControllerResult<unknown>>,
) {
	const wrapped = async (request: Request, response: Response) => {
		try {
			const result = await func(request, response);
			if (result.error) {
				return errorHandler(response, result.error);
			}
			if (result.isLogin) {
				return successHandlerLogin(
					response,
					result.data as ILogin,
					result.statusCode || httpStatus.OK,
				);
			}
			return successHandler(
				response,
				{ data: result.data, error: null },
				result.statusCode || httpStatus.OK,
			);
		} catch (error) {
			return errorHandler(response, error);
		}
	};
	return wrapped;
}

export default {
	resultHandler,
	errorHandler,
};

import type { Users } from "../modules/users/constants";
import { handlerUtil } from "../utils/index";
import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export function checkRoleAuthorization(authorizedRoles: Users[]) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			if (authorizedRoles.includes(res.locals.role as Users)) {
				next();
			} else {
				return handlerUtil.errorHandler(res, {
					errorMessage:
						"You don't have sufficient permissions to make this request.",
					statusCode: httpStatus.FORBIDDEN,
				});
			}
		} catch (e) {
			return handlerUtil.errorHandler(res, {
				errorMessage: e?.toString(),
				statusCode: httpStatus.FORBIDDEN,
			});
		}
	};
}

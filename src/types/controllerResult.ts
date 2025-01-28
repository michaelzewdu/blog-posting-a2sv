import { type IErrorResponse, newError } from "./errorResponse";
export interface IControllerResult<T> {
	error: IErrorResponse | null;
	data: T | null;
	statusCode?: number;
	isLogin?: boolean;
}

export function newControllerError<T>(
	errorMessage: any,
	statusCode?: number,
): IControllerResult<T> {
	return {
		error: newError(errorMessage, statusCode),
		data: null,
	};
}

export function newControllerData<T>(
	data: T,
	statusCode?: number,
	isLogin?: boolean,
): IControllerResult<T> {
	return {
		isLogin,
		statusCode,
		error: null,
		data,
	};
}

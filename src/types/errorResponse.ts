export interface IErrorResponse {
	statusCode: number;
	errorMessage: string;
}
export function instanceOfIErrorResponse(
	object: any,
): object is IErrorResponse {
	if (typeof object === "string") {
		return false;
	}
	return "errorMessage" in object;
}

export function newError(
	errorMessage: string,
	statusCode?: number,
): IErrorResponse {
	return {
		statusCode: statusCode || 500,
		errorMessage,
	};
}

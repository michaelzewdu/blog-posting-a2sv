import config from "../../config/config";
import jwtUtil from "../../utils/jwt.util";
// import { sendMail } from "@/utils/mailService";
import {
	type IControllerResult,
	newControllerData,
	newControllerError,
} from "../../types/controllerResult";
import { tokenService } from "../../utils/index";
import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import moment from "moment";
import { Users } from "./constants";
import type { ILogin, IPassword, IUser } from "./model";
import userService from "./service";

const register = async (data: IUser) => {
	try {
		const exists = await userService.getUserByEmail(data.email);
		if (exists)
			return newControllerError("User already exists", httpStatus.FORBIDDEN);
		await userService.createUser(data);
		return newControllerData({}, httpStatus.CREATED);
	} catch (error: any) {
		return newControllerError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
	}
};

const login = async (body: { email: string; password: string }) => {
	try {
		const user = await userService.getUserByEmail(body.email);
		if (!user || user.isDeleted === true)
			return newControllerError(
				"username or password is incorrect",
				httpStatus.BAD_REQUEST,
			);

		const passMatch = await user.comparePassword(body.password);
		if (!passMatch)
			return newControllerError(
				"username or password is incorrect",
				httpStatus.BAD_REQUEST,
			);

		const token = tokenService.generateAuthTokens({
			id: user.id,
			role: user.role,
            email: user.email
		});
		return newControllerData(
			{
				user: {
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					role: user.role,
					email: user.email,
					avatar: user.avatar,
				},
				accessToken: token.accessToken,
				refreshToken: token.refreshToken,
			},
			httpStatus.OK,
			true,
		);
	} catch (error: any) {
		return newControllerError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
	}
};

// const getAllUsers = async (role: string, page: number, limit: number) => {
// 	try {
// 		const offset = ((page > 0 ? page : 1) - 1) * limit;
// 		const users = await userService.getAllUsers(
// 			{ page, limit, offset },
// 		);
// 		return newControllerData(
// 			{
// 				users,
// 			},
// 			httpStatus.OK,
// 		);
// 	} catch (error: any) {
// 		return newControllerError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
// 	}
// };

const update = async (
	locals: { sub: string; role: string },
	body: Partial<IUser>,
) => {
	try {
		if (locals.role === Users.DATA_ENTRY) body.email = undefined;
		await userService.updateUser(locals.sub, body);
		return newControllerData({}, httpStatus.RESET_CONTENT);
	} catch (error: any) {
		return newControllerError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
	}
};

const updateAsAdmin = async (
	locals: { sub: string; role: string },
	body: IUser,
) => {
	try {
		await userService.updateUser(locals.sub, body);
		return newControllerData({}, httpStatus.RESET_CONTENT);
	} catch (error: any) {
		return newControllerError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
	}
};

const updatePassword = async (
	locals: { sub: string; role: string },
	body: IPassword,
) => {
	try {
		const userData = await userService.getUserById(locals.sub);
		if (!userData)
			return newControllerError("User not found", httpStatus.NOT_FOUND);
		if (locals.role === Users.DATA_ENTRY) {
			if (!body.oldPassword)
				return newControllerError(
					"Old password is incorrect",
					httpStatus.BAD_REQUEST,
				);
			const passMatch = await userData.comparePassword(body.oldPassword);
			if (!passMatch)
				return newControllerError(
					"Old password is incorrect",
					httpStatus.BAD_REQUEST,
				);
		}
		await userService.updateUser(locals.sub, {
			password: await bcrypt.hash(body.newPassword, 10),
		});
		return newControllerData({}, httpStatus.NO_CONTENT);
	} catch (error: any) {
		return newControllerError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
	}
};

const deleteUser = async (userId: string) => {
	try {
		const user = await userService.getUserById(userId);
		if (!user)
			return newControllerError(
				"User to delete not found",
				httpStatus.NOT_FOUND,
			);
		await userService.deleteUserById(userId);
		return newControllerData({}, httpStatus.RESET_CONTENT);
	} catch (error: any) {
		return newControllerError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
	}
};

// const forgotPassword = async (userEmail: string) => {
// 	try {
// 		const user: IUser | null = await userService.getUserByEmail(userEmail);
// 		if (!user) return newControllerError("This user does not exist", 400);

// 		const user_token = jwtUtil.generateToken(
// 			{ id: user.email, role: user.role, branch: user.branchId.id },
// 			moment().add(config.jwt.resetPasswordExpirationTime, "seconds"),
// 			config.jwt.resetPasswordSecret,
// 		);

// 		// implement mail
// 		return newControllerData("Sent mail", 200);
// 	} catch (error: any) {
// 		return newControllerError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
// 	}
// };

const resetPasswordController = async (token: string, newPassword: string) => {
	try {
		const verify = jwtUtil.verifyAuthTokens(
			token,
			config.jwt.resetPasswordSecret,
		);

		if (!verify || !verify.sub)
			return newControllerError("Token has expired or is invalid", 400);

		const updatedUser = await userService.resetPassword(
			newPassword,
			verify.sub,
		);

		if (!updatedUser) return newControllerError("An error occurred", 400);

		return newControllerData({ updatedUser }, httpStatus.OK);
	} catch (error: any) {
		return newControllerError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
	}
};

const refreshSession = async (
	refreshToken: string,
): Promise<IControllerResult<Omit<ILogin, "user" | "refreshToken">>> => {
	try {
		const user = tokenService.verifyAuthTokens(
			refreshToken,
			config.jwt.refreshSecret,
		);
		const token = tokenService.generateAuthTokens({
			id: user.id,
			role: user.role,
			email: user.email,
		});
		return newControllerData(
			{
				accessToken: token.accessToken,
			},
			httpStatus.OK,
		);
	} catch (error: any) {
		return newControllerError(error.message, httpStatus.UNAUTHORIZED);
	}
};

export default {
	register,
	login,
	// getAllUsers,
	refreshSession,
	update,
	updateAsAdmin,
	updatePassword,
	deleteUser,
	// forgotPassword,
	resetPasswordController,
};

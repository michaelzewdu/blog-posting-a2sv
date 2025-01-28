import type { Document } from "mongoose";

export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	avatar: string;
	role: string;
    isDeleted: boolean;
}

export interface ILogin {
	user: Omit<IUser, "password">;
	accessToken: string;
	refreshToken: string;
}

export interface IPassword {
	oldPassword: string | null;
	newPassword: string;
}

export interface IUserModel extends IUser, Document {
	comparePassword: (password: string) => Promise<boolean>;
	SignAccessToken: () => string;
}

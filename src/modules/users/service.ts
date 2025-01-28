import bcrypt from "bcryptjs";
import mongoose, { type PaginateResult } from "mongoose";
import { Users } from "./constants";
import type { IUser, IUserModel } from "./model";
import { userModel } from "./schema";

/**
 * Create a user
 * @param {IUser} data
 * @returns {Promise<IUserModel>}
 */
const createUser = async (data: IUser): Promise<IUserModel> => {
	return userModel.create({ ...data });
};

/**
 * Get all users
 * @param {{ limit: number; page: number; offset: number }} options
 * @returns {Promise<PaginateResult<IUserModel[]>>}
 */
// const getAllUsers = async (
// 	options: {
// 		limit: number;
// 		page: number;
// 		offset: number;
// 	},
// 	withAdmin = false,
// ): Promise<PaginateResult<IUserModel[]>> => {
// 	const filter =
// 		 {
// 				role: {
// 					$nin: [
// 						Users.ADMIN,
// 					],
// 				},
// 			};

// 	return userModel.paginate(filter, {
// 		sort: { createdAt: -1 },
// 		page: options?.page ?? 1 - 1 ?? 0,
// 		limit: options?.limit ?? 10,
// 		offset: options?.offset ?? 0,
// 	});
// };

/**
 * Get user by id
 * @param {string} id
 * @returns {Promise<IUserModel | null>}
 */
const getUserById = async (id: string): Promise<IUserModel | null> => {
	return userModel
		.findOne({ _id: new mongoose.Types.ObjectId(id) })
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<IUserModel | null>}
 */
const getUserByEmail = async (email: string): Promise<IUserModel | null> => {
	return userModel.findOne({ email }).populate("branchId");
};

/**
 * Update user
 * @param {string} id
 * @param {IUser} user
 * @returns {Promise<IUserModel | null>}
 */
const updateUser = async (
	id: string,
	user: Partial<IUser>,
): Promise<IUserModel | null> => {
	return userModel.findOneAndUpdate(
		{ _id: new mongoose.Types.ObjectId(id) },
		user,
		{ new: true },
	);
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<IUserModel>}
 */
const deleteUserById = async (userId: string): Promise<IUserModel | null> => {
	return userModel.findOneAndUpdate(
		{ _id: new mongoose.Types.ObjectId(userId) },
		{ isDeleted: true },
		{ new: true },
	);
};

const resetPassword = async (newPassword: string, userEmail: string) => {
	const hashedPassword = await bcrypt.hash(newPassword, 10);
	const updatedUser = await userModel.findOneAndUpdate(
		{ email: userEmail },
		{ password: hashedPassword },
	);
	if (!updatedUser) return null;
	return true;
};

export default {
	createUser,
	// getAllUsers,
	getUserById,
	getUserByEmail,
	updateUser,
	deleteUserById,
	resetPassword,
};

import mongoose, { Types } from "mongoose";
import type { IBlog, IBlogModel } from "./model";
import blogModel from "./schema";

/**
 * Create a blog
 * @param {IBlog} data
 * @returns {Promise<IBlogModel>}
 */
const createBlog = async (data: IBlog): Promise<IBlogModel> => {
	return blogModel.create(data);
};

/**
 * Get blog by name
 * @param {string} name
 * @returns {Promise<IBlogModel | null>}
 */
const getBlogByName = async (name: string): Promise<IBlogModel | null> => {
	return blogModel.findOne({
		name,
		$or: [
			{ isDeleted: { $exists: true, $eq: false } },
			{ isDeleted: { $exists: false } },
		],
	});
};

/**
 * Get blog by id
 * @param {string} id
 * @returns {Promise<IBlogModel | null>}
 */
const getBlogById = async (id: string): Promise<IBlogModel | null> => {
	return blogModel.findOne({
		_id: new mongoose.Types.ObjectId(id),
		$or: [
			{ isDeleted: { $exists: true, $eq: false } },
			{ isDeleted: { $exists: false } },
		],
	});
};

/**
 * Get bulk blog
 * @param {string[]} ids
 * @returns {Promise<IBlogModel[] | null>}
 */
const getBulkBlog = async (ids: string[]): Promise<IBlogModel[] | null> => {
	return blogModel.find({
		_id: { $in: ids.flatMap((idStr: string) => new Types.ObjectId(idStr)) },
		isDeleted: false || null,
	});
};

/**
 * Get all bloges
 * @returns {Promise<IBlogModel[] | null>}
 */
const getAllBloges = async (): Promise<IBlogModel[] | null> => {
	return blogModel.find({
		$or: [
			{ isDeleted: { $exists: true, $eq: false } },
			{ isDeleted: { $exists: false } },
		],
	});
};

/**
 * Update blog by id
 * @param {string} id
 * @param {IBlog} blog
 * @returns {Promise<IBlogModel | null>}
 */
const updateBlog = async (
	id: string,
	blog: IBlog,
): Promise<IBlogModel | null> => {
	return blogModel.findOneAndUpdate(
		{ _id: new mongoose.Types.ObjectId(id) },
		blog,
		{
			new: true,
		},
	);
};

/**
 * Delete blog by id
 * @param {string} id
 * @returns {Promise<IBlogModel>}
 */
const deleteBlogById = async (id: string): Promise<IBlogModel | null> => {
	return blogModel.findOneAndUpdate(
		{ _id: new mongoose.Types.ObjectId(id) },
		{ isDeleted: true },
		{ new: true },
	);
};

export default {
	createBlog,
	getBlogByName,
	getBlogById,
	getBulkBlog,
	getAllBloges,
	updateBlog,
	deleteBlogById,
};

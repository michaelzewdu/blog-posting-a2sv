import {
	type IControllerResult,
	newControllerData,
	newControllerError,
} from "../../types/controllerResult";
import httpStatus from "http-status";
import type { IBlog, IBlogModel } from "./model";
import blogService from "./service";

const createBlog = async (data: IBlog) => {
	try {
		const blogExist = await blogService.getBlogByName(data.blogId);
		if (blogExist)
			return newControllerError("Blog already exists", httpStatus.CONFLICT);

		const blog = await blogService.createBlog(data);
		return newControllerData(
			{
				blog,
			},
			httpStatus.OK,
		);
	} catch (error: any) {
		return newControllerError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
	}
};

const getSingleBlog = async (blogId: string) => {
	try {
		const blog = await blogService.getBlogById(blogId);

		if (!blog)
			return newControllerError("Blog not found", httpStatus.NOT_FOUND);
		return newControllerData(
			{
				blog,
			},
			httpStatus.OK,
		);
	} catch (error: any) {
		return newControllerError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
	}
};

const getBlogByName = async (
	blogName: string,
): Promise<IControllerResult<{ blog: IBlogModel }>> => {
	try {
		const blog = await blogService.getBlogByName(blogName);
		if (!blog)
			return newControllerError("Blog not found", httpStatus.NOT_FOUND);

		return newControllerData(
			{
				blog,
			},
			httpStatus.OK,
		);
	} catch (error: any) {
		return newControllerError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
	}
};

const getAllBloges = async () => {
	try {
		const bloges = await blogService.getAllBloges();

		if (!bloges)
			return newControllerError("Bloges not found", httpStatus.NOT_FOUND);
		return newControllerData(
			{
				bloges,
			},
			httpStatus.OK,
		);
	} catch (error: any) {
		return newControllerError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
	}
};

const updateBlog = async (blogId: string, body: IBlog) => {
	try {
		const blog = await blogService.getBlogById(blogId);
		if (!blog)
			return newControllerError(
				"Blog to update not found",
				httpStatus.NOT_FOUND,
			);

		const updatedBlog = await blogService.updateBlog(blogId, body);
		return newControllerData(
			{
				blog: updatedBlog,
			},
			httpStatus.OK,
		);
	} catch (error: any) {
		return newControllerError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
	}
};

const deleteBlog = async (blogId: string) => {
	try {
		const blog = await blogService.getBlogById(blogId);
		if (!blog)
			return newControllerError("Blog not found", httpStatus.NOT_FOUND);

		await blogService.deleteBlogById(blogId);

		return newControllerData({}, httpStatus.NO_CONTENT);
	} catch (error: any) {
		return newControllerError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
	}
};

export default {
	createBlog,
	getSingleBlog,
	getBlogByName,
	getAllBloges,
	updateBlog,
	deleteBlog,
};

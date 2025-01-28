import { checkRoleAuthorization } from "../../middlewares/roleAuthorization";
import { validator } from "../../utils/baseValidator.util";
import { handlerUtil } from "../../utils/index";
import express, { type Request } from "express";
import blogController from "./controller";
import {
	createBlogSchema,
	deleteBlogSchema,
	getBlogSchema,
	updateBlogSchema,
} from "./validator";
import { Users } from "../users/constants";

const blogRouter = express.Router();

blogRouter.post(
	"/create",
	checkRoleAuthorization([Users.DATA_ENTRY]),
	validator.body(createBlogSchema.body),
	handlerUtil.resultHandler(async (req: Request) => {
		return await blogController.createBlog(req.body);
	}),
);

blogRouter.get(
	"/:blogId",
	validator.params(getBlogSchema.params),
	handlerUtil.resultHandler(async (req: Request) => {
		return await blogController.getSingleBlog(req.params.blogId);
	}),
);

blogRouter.get(
	"/",
	handlerUtil.resultHandler(async () => {
		return await blogController.getAllBloges();
	}),
);

blogRouter.put(
	"/:blogId",
	checkRoleAuthorization([Users.DATA_ENTRY]),
	validator.params(updateBlogSchema.params),
	validator.body(updateBlogSchema.body),
	handlerUtil.resultHandler(async (req: Request) => {
		return await blogController.updateBlog(req.params.blogId, req.body);
	}),
);

blogRouter.delete(
	"/:blogId",
	validator.body(deleteBlogSchema.params),
	handlerUtil.resultHandler(async (req: Request) => {
		return await blogController.deleteBlog(req.params.blogId);
	}),
);

export { blogRouter };

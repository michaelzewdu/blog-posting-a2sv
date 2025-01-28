import Joi from "joi";

const createBlogSchema = {
	body: Joi.object().keys({
		title: Joi.string().required(),
		content: Joi.string().required(),
	}),
};

const getBlogSchema = {
	params: Joi.object().keys({
		blogId: Joi.string(),
	}),
};

const updateBlogSchema = {
	params: Joi.object().keys({
		blogId: Joi.string(),
	}),
	body: Joi.object().keys({
		title: Joi.string().optional(),
        content: Joi.string().optional(),
	}),
};

const deleteBlogSchema = {
	params: Joi.object().keys({
		blogId: Joi.string(),
	}),
};

export {
	createBlogSchema,
	getBlogSchema,
	updateBlogSchema,
	deleteBlogSchema,
};

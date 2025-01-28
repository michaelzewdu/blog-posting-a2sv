import Joi from "joi";
import { Users } from "./constants";

/* const password: Joi.CustomValidator<string> = (value, helpers) => {
  if (value.length < 8) {
    return helpers.error('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.error('password must contain at least 1 letter and 1 number');
  }
  return value;
}; */

const isPhone = (address: string) => {
	const { error } = Joi.string()
		.regex(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
		.validate(address);
	if (error) return false;
	return true;
};

const createUserSchema = {
	body: Joi.object().keys({
		firstName: Joi.string()
			.regex(/^\p{L}*$/u)
			.required(),
		lastName: Joi.string()
			.regex(/^\p{L}*$/u)
			.required(),
		email: Joi.string().email().required(),
		password: Joi.string().required().min(8),
		avatar: Joi.string().optional().allow(null),
		role: Joi.string()
			.valid(...Object.values(Users))
			.optional(),
		branchId: Joi.string().required(),
	}),
};

const loginSchema = {
	body: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
};

const forgotPasswordSchema = {
	query: Joi.object().keys({
		email: Joi.string().email(),
	}),
};

const resetPasswordSchema = {
	query: Joi.object().keys({
		token: Joi.string().required(),
	}),
	body: Joi.object().keys({
		newPassword: Joi.string().required(),
	}),
};

const getAllSchema = {
	query: Joi.object().keys({
		page: Joi.number().required(),
		limit: Joi.number().required(),
	}),
};

const updateUser = {
	body: Joi.object().keys({
		firstName: Joi.string()
			.regex(/^\p{L}*$/u)
			.optional(),
		lastName: Joi.string()
			.regex(/^\p{L}*$/u)
			.optional(),
		email: Joi.string().optional(),
		avatar: Joi.string().optional().allow(null),
	}),
};

const updateUserPassword = {
	body: Joi.object().keys({
		oldPassword: Joi.string().optional(),
		newPassword: Joi.string().required(),
	}),
};

const deleteUser = {
	params: Joi.object().keys({
		userId: Joi.string().required(),
	}),
};

export {
	isPhone,
	createUserSchema,
	loginSchema,
	getAllSchema,
	updateUser,
	updateUserPassword,
	deleteUser,
	forgotPasswordSchema,
	resetPasswordSchema,
};

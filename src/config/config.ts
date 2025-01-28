import dotenv from "dotenv";
import Joi from "joi";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env")})

const envVarsSchema = Joi.object().keys({
    NODE_ENV: Joi.string().required(),
    NODE_ENV_TESTING: Joi.boolean().required(),
    PORT: Joi.number().default(8000),
    ALLOW_TEST_CORS: Joi.boolean().required(),
		JWT_SECRET: Joi.string().required().description("JWT secret key"),
		JWT_REFRESH_SECRET: Joi.string()
			.required()
			.description("JWT Refresh secret key"),
		RESET_PASSWORD_SECRET: Joi.string()
			.required()
			.description("The secret used to generate a token on password forgot "),
		RESET_PASSWORD_EXPIRATION_TIME: Joi.string()
			.required()
			.description("Forgot password token expiration time"),
		JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
			.required()
			.description("minutes after which access tokens expire"),
		JWT_ACCESS_EXPIRATION_DAYS: Joi.number()
			.required()
			.description("days after which access tokens expire"),
		JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
			.required()
			.description("days after which refresh tokens expire"),
		DATABASE_URL: Joi.string().description(
			"The url needed for database connection",
		),
})

const { value: envVars, error } = envVarsSchema
	.prefs({ errors: { label: "key" } })
	.validate(process.env);

if (error) {
    console.log(error)
	// throw new Error(`Config validation error: ${error.message}`);
}

export default {
    env: envVars.NODE_ENV,
    isTestingEnv: envVars.NODE_ENV_TESTING,
    jwt: {
		secret: envVars.JWT_SECRET,
		refreshSecret: envVars.JWT_REFRESH_SECRET,
		accessExpirationDays: envVars.JWT_ACCESS_EXPIRATION_DAYS,
		accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
		refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
		resetPasswordSecret: envVars.RESET_PASSWORD_SECRET,
		resetPasswordExpirationTime: envVars.RESET_PASSWORD_EXPIRATION_TIME,
	},
	database: {
		url: envVars.DATABASE_URL,
	},
    allowTestCors: envVars.ALLOW_TEST_CORS,
}
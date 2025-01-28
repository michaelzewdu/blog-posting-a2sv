import config from "../config/config";
import type jwt from "jsonwebtoken";
import { sign, verify } from "jsonwebtoken";
import moment, { type Moment } from "moment";

// declare module "jsonwebtoken" {
// 	export interface JwtTokenPayload extends jwt.JwtPayload {
// 		role: string;
// 		branch: string;
// 	}
// }

type authTokens = {
	id: string;
	role: string;
	email: string;
};

/**
 * Generate token
 * @param {{ id: string; role: string }} user
 * @param {Moment} expires
 * @param {string} secret
 * @returns {string}
 */
const generateToken = (
	user: authTokens,
	expires: Moment,
	secret: string = config.jwt.secret,
): string => {
	const payload = {
		sub: user.id,
		role: user.role,
		email: user.email,
		iat: moment().unix(),
		exp: expires.unix(),
	};
	return sign(payload, secret);
};

/**
 * Generate auth tokens
 * @param {authTokens} options
 * @returns {{ accessToken: string; refreshToken: string }}
 */
const generateAuthTokens = (
	options: authTokens,
): { accessToken: string; refreshToken: string } => {
	const accessTokenExpires = moment().add(
		config.jwt.accessExpirationDays,
		"days",
	);
	const refreshTokenExpires = moment().add(
		config.jwt.refreshExpirationDays,
		"days",
	);
	const accessToken = generateToken(options, accessTokenExpires);
	const refreshToken = generateToken(
		options,
		refreshTokenExpires,
		config.jwt.refreshSecret,
	);

	return { accessToken, refreshToken };
};

/**
 * Verfiy auth tokens
 * @param {string} token
 * @returns {JwtTokenPayload | undefined}
 */
const verifyAuthTokens = (
	token: string,
	secretKey?: string,
): jwt.JwtTokenPayload => {
	try {
		const decoded = <jwt.JwtTokenPayload>(
			verify(token, secretKey ?? config.jwt.secret)
		);
		return decoded;
	} catch (error: unknown) {
		throw new Error(error as string);
	}
};

export default {
	generateToken,
	verifyAuthTokens,
	generateAuthTokens,
};

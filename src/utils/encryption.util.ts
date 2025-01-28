import bcrypt from "bcryptjs";

const encryptPassword = async (password: string) => {
	const encryptedPassword = await bcrypt.hash(password, 8);
	return encryptedPassword;
};

const isPasswordMatch = async (password: string, userPassword: string) => {
	return bcrypt.compare(password, userPassword);
};

export default {
	encryptPassword,
	isPasswordMatch,
};

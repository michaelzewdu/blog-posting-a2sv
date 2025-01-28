// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, { model, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { Users } from "./constants";
import type { IUserModel } from "./model";

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: [true, "please enter your first name"],
		},
		lastName: {
			type: String,
			required: [true, "please enter your last name"],
		},
		email: {
			type: String,
			required: true,
			index: {
				unique: true,
				sparse: true,
			},
		},
		password: {
			type: String,
			minlength: [8, "password must be at least 8 characters"],
		},
		avatar: {
			type: String,
			required: false,
		},
		role: {
			type: String,
			enum: Users,
			required: [true, "please enter the role"],
		},
		isDeleted: {
			type: Schema.Types.Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

userSchema.pre<IUserModel>("save", async function (next) {
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

//compare password
userSchema.methods.comparePassword = async function (
	enteredPassword: string,
): Promise<boolean> {
	return bcrypt.compare(enteredPassword, this.password);
};

//Sign access token
userSchema.methods.SignAccessToken = function () {
	return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
		expiresIn: "5m",
	});
};

userSchema.plugin(paginate);
const userModel = model<IUserModel, mongoose.PaginateModel<IUserModel>>(
	"User",
	userSchema,
);

export { userModel };

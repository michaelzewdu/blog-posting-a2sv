import { Schema, model } from "mongoose";
import type { IBlogModel } from "./model";

const blogSchema = new Schema(
	{
		title: {
			type: String,
			index: {
				unique: true,
			},
			required: [true, "please enter title name"],
		},
        content: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
		isDeleted: {
			type: Schema.Types.Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

const branchModel = model<IBlogModel>("Branch", blogSchema);
export default branchModel;

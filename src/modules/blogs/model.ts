import type { Document } from "mongoose";

export interface IBlog {
    blogId: string;
	title: string;
	content: string;
	author: string;
	isDeleted: boolean;
}

export interface IBlogModel extends IBlog, Document {}
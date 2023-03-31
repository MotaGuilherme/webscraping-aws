import * as mongoose from "mongoose";
export const ProductsSchema = new mongoose.Schema({
    url: { type: String },
    title: { type: String },
    price: { type: String },
    description: { type: String },
    comments: [{
        author: { type: String },
        date: { type: String },
        comment: { type: String },
    }],
    size: { type: Number },
    duration: { type: Number },
    status: { type: Number},
    createdAt: { type: Date, default: Date.now },
});
import { Document } from "mongoose";

export interface Product extends Document{
    url: string;
    title: string;
    price: string;
    description: string;
    rating: string
    comments: {
        author: string;
        date: string;
        rating: string;
        text: string;
    }[];
    size: number;
    duration: number;
    status: number;
    scrapedAt: Date;
}

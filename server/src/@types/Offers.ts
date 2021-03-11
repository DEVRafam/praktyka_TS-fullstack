import { Request } from "express";
import { Authorized } from "./authenticate";
//
//
type OfferCategory = "services" | "automotive" | "education" | "sport" | "fashion" | "electronic" | "real-estate" | "job" | "house-and-garden";
interface GetAll_QUERY {
    limit: number | undefined;
    page: number | undefined;
    category: undefined | OfferCategory;
    order: undefined | "oldest" | "cheapest" | "most-expensive";
}
export type GetAllRequest = Request<{}, {}, {}, GetAll_QUERY>;
//
//
//
export type GetSingleRequest = Request<{ slug: string }>;
//
//
//
interface Create_BODY {
    title: string;
    category: OfferCategory;
    description: string;
    price: number;
    contact: string;
    photos: string;
    country: string;
    currency: string;
    localization: string;
    advantages: string;
}
export type CreateRequest = Authorized & Request<{}, {}, Create_BODY>;
//
//
//
export type DeleteRequest = Authorized & Request<{ id: number }>;
//
//
//
export interface OfferSchema {
    id?: any;
    title?: string;
    slug?: string;
    category?: string;
    description?: string;
    price?: number;
    valueInUSD?: number;
    contact?: string[];
    photos?: string[];
    localization?: string;
    folder?: string;
    updatedAt?: string;
    advantages?: string;
    currency?: "PLN" | "EUR" | "USD" | "GBP";
    country?: string;
    creator?: {
        name?: string;
        surname?: string;
        email?: string;
        role?: string;
        avatar?: string | null;
        reviews_about_self?: {
            explanation?: string;
            scroe?: number;
            updatedAt?: string;
        }[];
    };
}

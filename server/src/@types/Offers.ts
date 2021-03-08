import { Request } from "express";
import { Authorized } from "../middlewares/authenticate";
//
//
interface GetAll_QUERY {
    limit: number | undefined;
    page: number | undefined;
}
export type Request_GetAll = Request<{}, {}, {}, GetAll_QUERY>;
//
//
//
export type Request_GetSingle = Request<{ slug: string }, {}, {}, { skipStatus: "__SKIP" | undefined }>;
//
//
//
interface Create_BODY {
    title: string;
    categories: string;
    description: string;
    price: number;
    contact: string;
    photos: string;
    localization: string;
}
export type Request_Create = Authorized & Request<{}, {}, Create_BODY>;
//
//
//
export interface OfferSchema {
    id: any;
    title: string;
    slug: string;
    categories: string[];
    description: string;
    price: number;
    contact: string[];
    photos: string[];
    localization: string;
    folder: string;
    updatedAt: string;
    creator: {
        name: string;
        surname: string;
        email: string;
        role: string;
        avatar: string | null;
        reviews_about_self: {
            explanation: string;
            scroe: number;
            updatedAt: string;
        }[];
    };
}

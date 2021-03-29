import { Request } from "express";
import { Authorized } from "./authenticate";
//
interface CreateArticleBodyRequest {
    title: string;
    mentioned_offers: string;
    content: string;
    tags: string;
    photos: string;
}
export type CreateArticleRequest = Authorized & Request<{}, {}, CreateArticleBodyRequest>;

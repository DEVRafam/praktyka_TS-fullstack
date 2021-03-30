import { Request } from "express";
import { Authorized } from "./authenticate";
import { OfferSchema } from "./Offers";
//
export type ArticleSchema = {
    id: number;
    title: string;
    mentioned_offers: OfferSchema[];
    content: {
        type: "header" | "text" | "image" | "list" | "mention_offer";
        value?: string;
        offer_id?: number;
        offer?: OfferSchema;
    }[];
};
//
interface CreateArticleBodyRequest {
    title: string;
    mentioned_offers: string;
    content: string;
    tags: string;
    photos: string;
}
export type CreateArticleRequest = Authorized & Request<{}, {}, CreateArticleBodyRequest>;
//
// SINGLE ARTICLE
//
export type GetSingleArticleRequest = Request<{ slug: string }>;
//
// MANY ARTICLE
//
interface GetManyArticlesQueries {
    limit: number | undefined;
    page: number | undefined;
}
export type GetManyArticlesRequest = Request<{}, {}, {}, GetManyArticlesQueries>;
//
export type GetHighlightedArticlesRequest = Request<{}, {}, {}, { limit: number | undefined }>;
//
export type DeleteRequest = Authorized & Request<{ id: number }>;
//
export type HighlightArticleRequest = Authorized & Request<{ id: number }>;

import { Offer } from "@/@types/Offer";
export type ArticleContentType = "header" | "text" | "image" | "list" | "mention_offer";
export interface ArticleContentField {
    type: ArticleContentType;
    value?: string | string[];
    offer_id?: number | null;
    _offer_data?: Offer;
}
//
export interface CreateArticleBody {
    title: string;
    mentioned_offers: number[];
    content: ArticleContentField[];
}

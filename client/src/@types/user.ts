import { OfferCategory } from "./Offer";
//
interface PureUser {
    id?: any;
    name?: string;
    surname?: string;
    email?: string;
    role?: string;
    avatar?: string | null;
    createdAt?: string;
}
export interface User extends PureUser {
    reviews_about_self?: {
        explanation?: string;
        score?: number;
        updatedAt?: string;
    }[];
}
//
export interface ProfileOffer {
    title: string;
    slug: string;
    category: OfferCategory;
    price: string;
    currency: string;
    photos: string[];
    localization: string;
    country: string;
    folder: string;
    createdAt: string;
    follows: {
        user_id?: any;
        offer_id?: any;
    }[];
}
//
export interface ReviewAboutSelf {
    id: any;
    explanation: string;
    score: number;
    updatedAt?: string;
    reviewer: {
        id: any;
        name: string;
        surname: string;
        avatar: string;
        updatedAt: string;
    };
}
//
export interface Profile extends PureUser {
    offers: ProfileOffer[];
    reviews_about_self: ReviewAboutSelf[];
    reviews_about_others: {
        id: any;
        explanation: string;
        score: number;
        updatedAt?: string;
        dealer: {
            id: any;
            name: string;
            surname: string;
            avatar: string;
            updatedAt: string;
        };
    }[];
    offers_stats: {
        category: OfferCategory;
        amount: number;
    }[];
}

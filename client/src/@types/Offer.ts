import { User } from "./user";

export type OfferCategory = "services" | "automotive" | "education" | "sport" | "fashion" | "electronic" | "real-estate" | "job" | "house-and-garden";
export type OfferCurrency = "PLN" | "EUR" | "USD" | "GBP";
//
export interface OfferRecommendations {
    fromCategories: {
        id?: any;
        title?: string;
        slug?: string;
        category?: string;
        price?: number;
        photos?: string[];
        localization?: string;
        folder?: string;
        updatedAt?: string;
        currency?: OfferCurrency;
        country?: string;
    };
    fromDealer: {
        id?: any;
        title?: string;
        slug?: string;
        category?: string;
        price?: number;
        photos?: string[];
        localization?: string;
        folder?: string;
        updatedAt?: string;
        currency?: OfferCurrency;
        country?: string;
    };
}
//
export interface FollowingOffer {
    title?: string;
    slug?: string;
    category?: string;
    description?: string;
    price?: number;
    photos?: string[];
    localization?: string;
    folder?: string;
    updatedAt?: string;
    currency?: OfferCurrency;
    country?: string;
}
//
export interface Offer {
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
    advantages?: string[];
    currency?: OfferCurrency;
    country?: string;
    creator?: User;
    follows?: {
        user_id?: any;
        offer_id?: any;
    }[];
}
//
export interface CreateOfferBody {
    title: string;
    category: OfferCategory;
    description: string;
    price: number;
    contact: {
        fb?: string;
        phone?: string;
        email?: string;
    };
    photos: File[];
    country: string;
    currency: OfferCurrency;
    localization: string;
    advantages: string[];
}

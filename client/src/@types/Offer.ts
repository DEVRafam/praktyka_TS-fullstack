import { User } from "./user";

export type OfferCategory = "services" | "automotive" | "education" | "sport" | "fashion" | "electronic" | "real-estate" | "job" | "house-and-garden";
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
    advantages?: string;
    currency?: "PLN" | "EUR" | "USD" | "GBP";
    country?: string;
    creator?: User;
    follows?: {
        user_id?: any;
        offer_id?: any;
    }[];
}

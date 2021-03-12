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

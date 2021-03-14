export interface User {
    id?: any;
    name?: string;
    surname?: string;
    email?: string;
    role?: string;
    avatar?: string | null;
    createdAt?: string;
    reviews_about_self?: {
        explanation?: string;
        score?: number;
        updatedAt?: string;
    }[];
}

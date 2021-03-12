import { JoiError } from "@/@types/joiError";
//
// LOGIN
//
export interface LocalStorageUser {
    accessToken: string;
    refreshToken: string;
    name: string;
    surname: string;
    email: string;
    avatar: string;
    role: string;
}
export type Errors = JoiError[] | "credentials_do_not_match";
export interface LoginResponse {
    result: "positive" | "negative";
    errors?: Errors;
    tokens?: {
        accessToken: string;
        refreshToken: string;
    };
    userData?: {
        id: any;
        name: string;
        surname: string;
        email: string;
        avatar: string;
        role: string;
    };
}
export interface LoginBody {
    email: string;
    password: string;
}
//
// REFRESH TOKEN
//
export interface RefreshTokenResponse {
    result: "positive" | "negative";
    error?: string;
    accessToken?: string;
    userData: {
        id: any;
        name: string;
        surname: string;
        email: string;
        avatar: string;
        role: string;
    };
}

import { Request } from "express";
//
//
//
export interface RefreshTokenRequest extends Request {
    body: {
        refreshToken: string;
        accessToken: string;
    };
}
export interface RefreshTokenResponse {
    status: "positive" | "negative";
    error?: string;
    accessToken: string;
}
//
//
//
export interface RegisterRequest extends Request {
    body: {
        name: string;
        surname: string;
        email: string;
        password: string;
        repeat_password: string;
    };
}
//
//
//
export interface LoginRequest extends Request {
    body: {
        email: string;
        password: string;
    };
}
export interface LoginResponse {
    status: "positive" | "negative";
    errors?: "credentials_do_not_match";
    tokens?: {
        accessToken: string;
        refreshToken: string;
    };
    userData?: {
        id: any;
        name: string;
        surname: string;
        email: string;
    };
}

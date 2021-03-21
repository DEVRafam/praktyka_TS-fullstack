import { Request } from "express";
//
export interface Authorized {
    authorizedToken: {
        id: any;
        role: string;
    };
}
//
export interface OptionalAuthorized {
    authorizedToken?: {
        id: any;
        role: string;
    };
}
export type AuthorizedRequest = Request & Authorized;

import { Request } from "express";
//
export interface Authorized {
    authorizedToken: {
        id: any;
    };
}
export type AuthorizedRequest = Request & Authorized;

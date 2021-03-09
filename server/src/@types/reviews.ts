import { Request } from "express";
import { Authorized } from "./authenticate";
//
export type SetReviewRequest = Authorized &
    Request<
        { id: number },
        {},
        {
            score: number;
            explanation?: string;
        }
    >;
//
export type DeleteRequest = Authorized & Request<{ id: number }>;

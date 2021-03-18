import { Request } from "express";
import { Authorized } from "./authenticate";
//
export type ChangeAvatarRequest = Authorized & Request<{}, {}, {}, { user?: number }>;
export type DeleteUserRequest = Authorized &
    Request<
        { id: number },
        {},
        {
            email: string;
            password: string;
            repeat_password: string;
        }
    >;

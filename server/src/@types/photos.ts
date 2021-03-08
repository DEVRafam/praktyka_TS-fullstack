import { Request } from "express";
//
export type GetPhotoRequest = Request<{
    section: string | undefined;
    folder: string | undefined;
    image: string | undefined;
}>;
//
export type GetAvatarRequest = Request<{
    image: string | undefined;
}>;

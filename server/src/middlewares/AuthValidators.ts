import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import BetterJoiError from "../helpers/betterJoiErorr";
import { loginValidators as ErrorMessages } from "../i18n/eng";
//
// /login
//
export const LoginRequestValidate = (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;
    //
    const scheme = Joi.object({
        email: Joi.string().lowercase().trim().max(255).email().required().messages(ErrorMessages.email),
        password: Joi.string().max(255).required().trim().messages(ErrorMessages.password),
    });
    //
    const { error } = scheme.validate({ email, password }, { abortEarly: false });
    if (error) {
        return res.send({
            result: "negative",
            errors: BetterJoiError(error),
        });
    } else next();
};
//
// /refresh-token
//
export interface RefreshTokenBody extends Request {
    body: {
        refreshToken: string;
        accessToken: string;
    };
}
export const RefreshTokenValidate = (req: RefreshTokenBody, res: Response, next: NextFunction) => {
    const scheme = Joi.object({
        refreshToken: Joi.string().required().max(400).min(200),
        accessToken: Joi.string().required().max(400).min(200),
    });
    //
    const { error } = scheme.validate(req.body, { abortEarly: false });
    if (error) return res.sendStatus(400);
    else return next();
};

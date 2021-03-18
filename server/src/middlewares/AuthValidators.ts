import Joi from "joi";
import { Response, NextFunction } from "express";
import BetterJoiError from "../helpers/betterJoiErorr";
import { LoginErrorMessages, RegisterErrorMessages } from "../i18n/eng";
import { RefreshTokenRequest, RegisterRequest, LoginRequest } from "../@types/auth";
import { User } from "../services/Models";
//
// /register
//
export const RegisterRequestValidator = async (req: RegisterRequest, res: Response, next: NextFunction) => {
    const scheme = Joi.object({
        name: Joi.string().min(3).max(20).required().messages(RegisterErrorMessages.name),
        surname: Joi.string().min(5).max(30).required().messages(RegisterErrorMessages.surname),
        email: Joi.string().email().min(3).max(255).required().messages(RegisterErrorMessages.email),
        password: Joi.string().min(6).max(32).required().messages(RegisterErrorMessages.password),
        repeat_password: Joi.any().valid(Joi.ref("password")).required().messages(RegisterErrorMessages.repeat_password),
    });
    //
    const { error } = scheme.validate(req.body, { abortEarly: false });
    if (error) {
        return res.send({
            result: "negative",
            errors: BetterJoiError(error),
        });
    } else if (await User.findOne({ where: { email: req.body.email } })) {
        return res.send({
            result: "negative",
            errors: [
                {
                    element: "email",
                    type: "taken",
                    message: RegisterErrorMessages.email.taken,
                },
            ],
        });
    } else next();
};
//
// /login
//
export const LoginRequestValidate = (req: LoginRequest, res: Response, next: NextFunction) => {
    const { password, email } = req.body;
    //
    const scheme = Joi.object({
        email: Joi.string().lowercase().trim().max(255).email().required().messages(LoginErrorMessages.email),
        password: Joi.string().max(255).required().trim().messages(LoginErrorMessages.password),
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
export const RefreshTokenValidate = (req: RefreshTokenRequest, res: Response, next: NextFunction) => {
    const scheme = Joi.object({
        refreshToken: Joi.string().required().max(400).min(200),
        accessToken: Joi.string().required().max(400).min(200),
    });
    //
    const { error } = scheme.validate(req.body, { abortEarly: false });
    if (error) return res.sendStatus(400);
    else return next();
};

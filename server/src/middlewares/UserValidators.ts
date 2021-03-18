import Joi from "joi";
import { Response, NextFunction } from "express";
import { User } from "../services/Models";
//
export const DeleteAccountValidator = async (req: any, res: Response, next: NextFunction) => {
    const scheme = Joi.object({
        email: Joi.string().email().min(3).max(255).required(),
        password: Joi.string().max(32).required(),
        repeat_password: Joi.any().valid(Joi.ref("password")).required(),
    });
    const { error } = scheme.validate(req.body, { abortEarly: false });
    if (error) {
        return res.sendStatus(400);
    }
    // check whether user with id from params actually exists
    if (!(await User.findOne({ where: { id: req.params.id } }))) return res.sendStatus(404);
    // authorize authenticated user
    if (req.authorizedToken.role === "ADMIN" || req.authorizedToken.id == req.params.id) return next();
    else return res.sendStatus(401);
};
//
export const ChangeAvatarValidator = async (req: any, res: Response, next: NextFunction) => {
    if (req.files === undefined) return res.sendStatus(400);
    //
    const { avatar }: { avatar: any } = req.files as any;
    if (!avatar) return res.sendStatus(400);
    //
    const id = req.query.user ? req.query.user : req.authorizedToken.id;
    if (id != req.authorizedToken.id && req.authorizedToken.role === "USER") return res.sendStatus(401);
    //
    const user = await User.findOne({ where: { id } });
    if (!user) return res.sendStatus(404);
    //
    next();
};

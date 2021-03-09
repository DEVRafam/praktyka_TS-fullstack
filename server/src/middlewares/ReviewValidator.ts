import Joi from "joi";
import { Response, NextFunction } from "express";
import BetterJoiError from "../helpers/betterJoiErorr";
import { SetReviewErrorMessages } from "../i18n/eng";
import { User, Review } from "../services/Models";
//
export const SetReviewValidator = async (req: any, res: Response, next: NextFunction) => {
    // check whether user with id from params actually exists
    if (!(await User.findOne({ where: { id: req.params.id } }))) return res.sendStatus(404);
    // check whether user wants to review himself
    if (req.params.id == req.authorizedToken.id) return res.sendStatus(400);
    const scheme = Joi.object({
        score: Joi.number().min(1).max(5).required().messages(SetReviewErrorMessages.score),
        explanation: Joi.string().min(10).max(200).messages(SetReviewErrorMessages.explanation),
    });
    const { error } = scheme.validate(req.body, { abortEarly: false });
    if (error) {
        return res.send({
            result: "negative",
            errors: BetterJoiError(error),
        });
    } else next();
};
//
export const DeleteReviewValidator = async (req: any, res: Response, next: NextFunction) => {
    // check whather review with given ID exists
    const review = await Review.findOne({ where: { id: req.params.id } });
    if (!review) return res.sendStatus(404);
    // check whether authenticated user is owner of review
    else if (req.authorizedToken.id == review.reviewer_id) return next();
    // check whether authenticated user is admin
    else if ((await User.findOne({ where: { id: req.authorizedToken.id } })).role === "ADMIN") return next();
    // unauthorized
    else return res.sendStatus(401);
};

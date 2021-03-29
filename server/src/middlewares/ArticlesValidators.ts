import Joi from "joi";
import { Response, NextFunction } from "express";
import BetterJoiError from "../helpers/betterJoiErorr";
import { CreateArticleErrorMessages } from "../i18n/eng";
import { CreateArticleRequest } from "../@types/articles";
//
//
//
export const CreateNewArticleValidator = (req: CreateArticleRequest, res: Response, next: NextFunction) => {
    const scheme = Joi.object({
        title: Joi.string().min(3).max(50).required().messages(CreateArticleErrorMessages.title),
        content: Joi.array()
            .items(
                Joi.object({
                    type: Joi.string().valid("header", "text", "image", "list", "mention_offer"),
                    value: Joi.string().min(3).max(2000),
                    list: Joi.array().items(Joi.string().min(3).max(150)).min(1),
                    offer_id: Joi.number(),
                })
            )
            .min(1)
            .max(20)
            .required()
            .messages(CreateArticleErrorMessages.content),
        mentioned_offers: Joi.array().items(Joi.number().required()).min(0).max(30).required().messages(CreateArticleErrorMessages.mentioned_offers),
        tags: Joi.array().items(Joi.string().min(3).max(50)).min(1).max(30).required().messages(CreateArticleErrorMessages.tags),
        photos: Joi.array().min(1).required().messages(CreateArticleErrorMessages.photos),
    });
    // convert multipart/data into JSON
    // using multipart/data was imposed by uploading photo, obviously
    const { error } = scheme.validate(
        {
            title: req.body.title,
            content: req.body.content && JSON.parse(req.body.content),
            mentioned_offers: req.body.content && JSON.parse(req.body.mentioned_offers),
            photos: req.body.photos && JSON.parse(req.body.photos),
            tags: req.body.tags && JSON.parse(req.body.tags),
        },
        // {
        // title: req.body.title,
        // content: req.body.content,
        // mentioned_offers: req.body.content,
        // photos: req.body.photos,
        // tags: req.body.tags,
        // },
        { abortEarly: false }
    );
    if (error) {
        return res.send({
            result: "negative",
            errors: BetterJoiError(error),
        });
    } else next();
};

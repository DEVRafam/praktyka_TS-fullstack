import Joi from "joi";
import { Response, NextFunction } from "express";
import BetterJoiError from "../helpers/betterJoiErorr";
import { CreateOfferErrorMessages } from "../i18n/eng";
import { CreateRequest } from "../@types/Offers";
//
export const CreateNewOfferValidator = (req: CreateRequest, res: Response, next: NextFunction) => {
    const scheme = Joi.object({
        title: Joi.string().min(3).max(50).required().messages(CreateOfferErrorMessages.title),
        category: Joi.string().valid("services", "automotive", "education", "sport", "fashion", "electronic", "real-estate", "job-advertisement", "house-and-garden", "computer-and-games").required().messages(CreateOfferErrorMessages.category),
        description: Joi.string().min(10).max(2000).required(),
        contact: Joi.object({
            email: Joi.string().email().min(3).max(100),
            phone: Joi.string().min(11).max(11),
            fb: Joi.string()
                .min(26)
                .max(200)
                .custom((val, helper) => {
                    if (val.slice(0, 25) === "https://www.facebook.com/") return true;
                    else {
                        return helper.error("fb.invalid");
                    }
                }),
        })
            .required()
            .min(1)
            .messages(CreateOfferErrorMessages.contact),
        price: Joi.number().required().messages(CreateOfferErrorMessages.price),
        currency: Joi.string().valid("PLN", "EUR", "USD", "GBP").required().messages(CreateOfferErrorMessages.currency),
        localization: Joi.string().min(3).max(100).required().messages(CreateOfferErrorMessages.localization),
        country: Joi.string().min(3).max(100).required().messages(CreateOfferErrorMessages.country),
        advantages: Joi.array().items(Joi.string().min(3).max(150)).min(1).max(30).required().messages(CreateOfferErrorMessages.advantages),
        photos: Joi.array().min(1).required().messages(CreateOfferErrorMessages.photos),
    });
    // convert multipart/data into JSON
    // using multipart/data was imposed by uploading photo, obviously
    const { error } = scheme.validate(
        {
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            contact: req.body.contact && JSON.parse(req.body.contact),
            localization: req.body.localization,
            photos: req.body.photos && JSON.parse(req.body.photos),
            currency: req.body.currency,
            country: req.body.country,
            advantages: req.body.advantages && JSON.parse(req.body.advantages),
        },
        { abortEarly: false }
    );
    if (error) {
        return res.send({
            result: "negative",
            errors: BetterJoiError(error),
        });
    } else next();
};

import Joi from "joi";
import { Response, NextFunction } from "express";
import BetterJoiError from "../helpers/betterJoiErorr";
import { CreateOfferErrorMessages } from "../i18n/eng";
import { CreateRequest } from "../@types/Offers";
//
export const CreateNewOfferValidator = (req: CreateRequest, res: Response, next: NextFunction) => {
    const scheme = Joi.object({
        title: Joi.string().min(3).max(20).required().messages(CreateOfferErrorMessages.title),
        categories: Joi.array().items(Joi.string().min(3).max(50)).max(3).required().messages(CreateOfferErrorMessages.categories),
        description: Joi.string().min(10).max(1000).required(),
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
        localization: Joi.string().min(3).max(100).required().messages(CreateOfferErrorMessages.localization),
        photos: Joi.array().min(1).required().messages(CreateOfferErrorMessages.photos),
    });
    // convert multipart/data into JSON
    // using multipart/data was imposed by uploading photo, obviously
    const { error } = scheme.validate(
        {
            title: req.body.title,
            categories: JSON.parse(req.body.categories),
            description: req.body.description,
            price: req.body.price,
            contact: JSON.parse(req.body.contact),
            localization: req.body.localization,
            photos: JSON.parse(req.body.photos),
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

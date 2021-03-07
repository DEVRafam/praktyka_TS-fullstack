import { Offer, User, Review } from "../services/Models";
import { Response } from "express";
// const { Op } = require("sequelize");
// status: { [Op.not]: "DEFAULT" },
//
interface GetAllRequest {
    query: {
        limit: number | undefined;
        page: number | undefined;
    };
}
interface GetSingleRequest {
    params: {
        slug: string | undefined;
    };
    query: {
        skipStatus: "__SKIP" | undefined;
    };
}
// RESPONSE
interface Offer {
    id: any;
    title: string;
    slug: string;
    categories: string[];
    description: string;
    price: number;
    contact: string[];
    photos: string[];
    localization: string;
    folder: string;
    updatedAt: string;
    creator: {
        name: string;
        surname: string;
        email: string;
        role: string;
        avatar: string | null;
        reviews_about_self: {
            explanation: string;
            scroe: number;
            updatedAt: string;
        }[];
    };
}
//
//
//
class OfferController {
    protected excludeFromCreator: readonly string[] = ["id", "createdAt", "updatedAt", "tokens", "password"];
    protected excludeFromOffer: readonly string[] = ["createdAt", "creator_id"];
    protected excludeFromReviews: readonly string[] = ["createdAt", "id", "creator_id", "reviewer_id", "dealer_id"];
    //
    protected beforeSend(data: Offer[] | Offer) {
        // basically reverse reviews table to impose DESC sorting via alternative way
        if (data instanceof Array) {
            data.forEach((row) => {
                row.creator.reviews_about_self.reverse();
            });
        } else data.creator.reviews_about_self.reverse();
        //
        return data;
    }
    //
    //
    //
    async getAll(req: GetAllRequest, res: Response) {
        try {
            const limit = req.query.limit || 10;
            const page = req.query.page || 1;
            //
            const response = await Offer.findAll({
                where: {
                    status: "DEFAULT",
                },
                attributes: {
                    exclude: [...this.excludeFromOffer, "status"],
                },
                include: [
                    {
                        model: User,
                        as: "creator",
                        attributes: {
                            exclude: this.excludeFromCreator,
                        },
                        include: [
                            {
                                model: Review,
                                as: "reviews_about_self",
                                attributes: {
                                    exclude: this.excludeFromReviews,
                                },
                            },
                        ],
                    },
                ],
                order: [["id", "DESC"]],
                // pagination
                limit,
                offset: (page - 1) * limit,
            });
            //
            return res.send(this.beforeSend(response));
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
    //
    async getSingle(req: GetSingleRequest, res: Response) {
        try {
            const { slug } = req.params;
            if (slug === undefined) return res.sendStatus(400);
            //
            const where = {
                slug,
                status: "DEFAULT",
            };
            if (req.query.skipStatus === "__SKIP") delete where.status;
            //
            const response = await Offer.findOne({
                where,
                attributes: {
                    exclude: this.excludeFromOffer,
                },
                include: [
                    {
                        model: User,
                        as: "creator",
                        attributes: {
                            exclude: this.excludeFromCreator,
                        },
                        include: [
                            {
                                model: Review,
                                as: "reviews_about_self",
                                attributes: {
                                    exclude: this.excludeFromReviews,
                                },
                                order: [["id", "DESC"]],
                            },
                        ],
                    },
                ],
            });
            //
            return response ? res.send(this.beforeSend(response)) : res.sendStatus(404);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
export default new OfferController();

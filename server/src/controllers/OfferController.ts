import { Offer, User } from "../services/Models";
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
//
//
//
class OfferController {
    protected excludeFromCreator: readonly string[] = ["id", "createdAt", "updatedAt", "tokens", "password"];
    protected excludeFromOffer: readonly string[] = ["createdAt", "creator_id"];
    //
    //
    //
    async getAll(req: GetAllRequest, res: Response) {
        try {
            const limit = req.query.limit || 10;
            const page = req.query.page || 1;
            //
            console.log(limit, page);
            const response = await Offer.findAll({
                where: {
                    status: "DEFAULT",
                },
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
                    },
                ],
                // pagination
                limit,
                offset: (page - 1) * limit,
            });
            //
            return res.send(response);
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
                    },
                ],
            });
            //
            return response ? res.send(response) : res.sendStatus(404);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
export default new OfferController();

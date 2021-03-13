import { GetAllRequest } from "../../@types/Offers";
import { Offer, User } from "../../services/Models";
import { Response } from "express";
import { Op } from "sequelize";
//
class GetManyOffersController {
    protected req: GetAllRequest;
    protected excludes = {
        fromOffer: ["createdAt", "creator_id", "advantages", "valueInUSD"],
        fromCreator: ["createdAt", "updatedAt", "tokens", "password", "contact", "email"],
    };
    //
    // helpers
    //
    protected generateOrderClause() {
        return {
            order: (() => {
                switch (this.req.query.order) {
                    case "oldest":
                        return [["id", "ASC"]];
                    case "most-expensive":
                        return [["valueInUSD", "DESC"]];
                    case "cheapest":
                        return [["valueInUSD", "ASC"]];
                    default:
                        return [["id", "DESC"]];
                }
            })(),
        };
    }
    protected generateWhereClause() {
        return {
            where: (() => {
                const { category, search } = this.req.query;
                console.log(search);
                const where = {
                    status: "DEFAULT",
                    category: category,
                    [Op.or]: [{ title: { [Op.iLike]: `%${search}%` } }, { description: { [Op.iLike]: `%${search}%` } }],
                };
                //
                if (category === undefined) delete where.category;
                if (search === undefined) {
                    delete where[Op.or];
                }
                return where;
            })(),
        };
    }
    protected handlePagination() {
        const limit = this.req.query.limit || 10;
        const page = this.req.query.page || 1;
        //
        return {
            limit,
            offset: (page - 1) * limit,
        };
    }
    //
    //
    //
    async main(req: GetAllRequest, res: Response) {
        this.req = req;
        try {
            const response = await Offer.findAndCountAll({
                ...this.generateWhereClause(),
                attributes: {
                    exclude: [...this.excludes.fromOffer, "status"],
                },
                include: [
                    {
                        model: User,
                        as: "creator",
                        attributes: {
                            exclude: this.excludes.fromCreator,
                        },
                    },
                ],
                ...this.generateOrderClause(),
                ...this.handlePagination(),
            });
            //
            return res.send(response);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
export default new GetManyOffersController();

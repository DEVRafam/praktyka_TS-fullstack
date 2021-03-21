import { RecommendationsRequest, OfferSchema } from "../../@types/Offers";
import { Offer } from "../../services/Models";
import { Response } from "express";
import { Op } from "sequelize";
//
class RecommendationsOfferController {
    protected offer: OfferSchema;
    protected sequelizeQueryObject = {
        limit: 3,
        order: [["id", "DESC"]],
        attributes: {
            exclude: ["createdAt", "creator_id", "valueInUSD", "description", "advantages", "contact", "status"],
        },
    };

    //
    // generate recommendations
    //
    protected async fromCategories() {
        return await Offer.findAll({
            where: {
                category: this.offer.category,
                id: { [Op.not]: this.offer.id },
                status: "DEFAULT",
            },
            ...this.sequelizeQueryObject,
        });
    }
    protected async fromDealer() {
        return await Offer.findAll({
            where: {
                id: { [Op.not]: this.offer.id },
                category: { [Op.not]: this.offer.category },
                creator_id: this.offer.creator_id,
                status: "DEFAULT",
            },
            ...this.sequelizeQueryObject,
        });
    }
    //
    async main(req: RecommendationsRequest, res: Response) {
        this.offer = await Offer.findOne({ where: { slug: req.params.slug } });
        if (!this.offer) return res.sendStatus(404);
        //
        return res.send({
            fromCategories: await this.fromCategories(),
            fromDealer: await this.fromDealer(),
        });
    }
}
//
export default new RecommendationsOfferController();

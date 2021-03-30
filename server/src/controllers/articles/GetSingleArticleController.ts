import { Response } from "express";
import { Op } from "sequelize";
import { GetSingleArticleRequest, GetSingleArticleResponse } from "../../@types/articles";
import { Article, Follow, Offer, User } from "../../services/Models";
//
class GetSingleArticleController {
    protected response: GetSingleArticleResponse;
    protected excludes = {
        fromArticle: ["createdAt", "creator_id"],
        fromCreator: ["updatedAt", "createdAt", "tokens", "password"],
        fromOffer: ["createdAt", "creator_id", "advantages", "valueInUSD", "contact"],
        fromFollow: ["id", "createdAt", "updatedAt"],
    };
    protected offersQueryProperties = {
        attributes: { exclude: this.excludes.fromOffer },
        include: [
            {
                model: User,
                as: "creator",
                attributes: { exclude: this.excludes.fromCreator },
            },
            {
                model: Follow,
                as: "follows",
                attributes: { exclude: this.excludes.fromFollow },
            },
        ],
    };
    // helpers
    protected async findOffersInsideContent() {
        const { response } = this;
        for (let index in response.content) {
            const el = response.content[index];
            if (el.type === "mention_offer") {
                el.offer = await Offer.findOne({
                    where: {
                        id: el.offer_id,
                        status: "DEFAULT",
                    },
                    ...this.offersQueryProperties,
                });
                delete el.offer_id;
            }
        }
    }
    protected async includeMentionedOffers() {
        const { response } = this;
        response.mentioned_offers = await Offer.findAll({
            where: {
                id: { [Op.in]: response.mentioned_offers },
                status: "DEFAULT",
            },
            ...this.offersQueryProperties,
        });
    }
    //
    //
    //
    async main(req: GetSingleArticleRequest, res: Response) {
        try {
            this.response = await Article.findOne({
                where: { slug: req.params.slug },
                attributes: { exclude: this.excludes.fromArticle },
                include: [
                    {
                        model: User,
                        as: "creator",
                        attributes: { exclude: this.excludes.fromCreator },
                    },
                ],
            });
            if (!this.response) return res.sendStatus(404);
            //
            await this.includeMentionedOffers();
            await this.findOffersInsideContent();
            //
            return res.send(this.response);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
export default new GetSingleArticleController();

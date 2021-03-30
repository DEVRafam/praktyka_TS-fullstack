import jwt from "jsonwebtoken";
import { GetSingleRequest, OfferSchema } from "../../@types/Offers";
import { Offer, User, Review, Follow } from "../../services/Models";
import { Response } from "express";
import { tokens } from "../../config/config";
const { access_secret } = tokens;
//
class GetSingleOfferController {
    protected req: GetSingleRequest;
    protected excludes = {
        fromOffer: ["createdAt", "creator_id", "valueInUSD"],
        fromCreator: ["updatedAt", "tokens", "password"],
        fromReviews: ["createdAt", "id", "creator_id", "reviewer_id", "dealer_id", "explanation", "updatedAt"],
        fromFollows: ["createdAt", "updatedAt"],
    };
    //
    // helpers
    //
    protected reverseReviews(data: OfferSchema) {
        data.creator.reviews_about_self.reverse();
        return data;
    }
    // the reason of doing it, is to give admins and offers owners
    // ability to get access offer independently from status
    protected async userIsEitherAdminOrOwner() {
        try {
            const token = this.req.headers.authorization.split(" ")[1];
            let userId = null;
            //
            jwt.verify(token, access_secret, (err: any, dataFromToken: any) => {
                const keys = Object.keys(dataFromToken);
                const propertiesToCheck = ["id", "password", "createdAt", "iat", "exp"];
                let tokenIsRight = true;
                propertiesToCheck.forEach((property) => {
                    if (!keys.includes(property)) tokenIsRight = false;
                });
                //
                if (tokenIsRight) userId = dataFromToken.id;
            });
            //
            const user = await User.findOne({
                where: { id: userId },
                include: [{ model: Offer, as: "offers", attributes: ["slug"] }],
            });
            return user.role === "ADMIN" || user.offers.find((target: { slug: string }) => target.slug === this.req.params.slug);
        } catch (e: any) {
            return false;
        }
    }
    protected async generateWhereClause() {
        const where = {
            slug: this.req.params.slug,
            status: "DEFAULT",
        };
        if (await this.userIsEitherAdminOrOwner()) delete where.status;
        //
        return where;
    }
    //
    //
    //
    async main(req: GetSingleRequest, res: Response) {
        this.req = req;
        try {
            const matchedOffer = await Offer.findOne({
                where: await this.generateWhereClause(),
                attributes: {
                    exclude: this.excludes.fromOffer,
                },
                include: [
                    {
                        model: User,
                        as: "creator",
                        attributes: {
                            exclude: this.excludes.fromCreator,
                        },
                        include: [
                            {
                                model: Review,
                                as: "reviews_about_self",
                                attributes: {
                                    exclude: this.excludes.fromReviews,
                                },
                                order: [["id", "DESC"]],
                            },
                        ],
                    },
                    {
                        model: Follow,
                        as: "follows",
                        attributes: {
                            exclude: this.excludes.fromFollows,
                        },
                    },
                ],
            });
            //
            return matchedOffer ? res.send(this.reverseReviews(matchedOffer) as OfferSchema) : res.sendStatus(404);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
//
export default new GetSingleOfferController();

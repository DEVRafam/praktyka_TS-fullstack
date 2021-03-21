import { Response } from "express";
import { OwnedOffersRequest } from "../../@types/Offers";
import { Offer, Follow } from "../../services/Models";
//
class GetOwnedOffersController {
    protected readonly excludes = {
        fromOffer: ["createdAt", "creator_id", "valueInUSD", "contact", "advantages"],
        fromFollows: ["createdAt", "updatedAt"],
    };
    async main(req: OwnedOffersRequest, res: Response) {
        try {
            const { role, id } = req.authorizedToken;
            if (role !== "ADMIN" && id !== req.params.id) res.sendStatus(401);
            //
            else
                return res.send(
                    await Offer.findAll({
                        where: { creator_id: req.params.id },
                        attributes: { exclude: this.excludes.fromOffer },
                        include: [
                            {
                                model: Follow,
                                as: "follows",
                                attributes: { exclude: this.excludes.fromFollows },
                            },
                        ],
                    })
                );
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
export default new GetOwnedOffersController();

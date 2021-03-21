import { Response } from "express";
import { OwnedOffersRequest } from "../../@types/Offers";
import { Offer, Follow, User } from "../../services/Models";
//
class GetOwnedOffersController {
    protected readonly excludes = {
        fromOffer: ["createdAt", "creator_id", "valueInUSD", "contact", "advantages"],
        fromFollows: ["createdAt", "updatedAt"],
    };
    async main(req: OwnedOffersRequest, res: Response) {
        try {
            const { role, id } = req.authorizedToken;
            if (role !== "ADMIN" && id != req.params.id) return res.sendStatus(401);
            //
            const response = await User.findOne({
                where: { id: req.params.id },
                attributes: ["name", "surname"],
                include: [
                    {
                        model: Offer,
                        as: "offers",
                        attributes: { exclude: this.excludes.fromOffer },
                        required: false,
                        include: [
                            {
                                model: Follow,
                                as: "follows",
                                attributes: { exclude: this.excludes.fromFollows },
                            },
                        ],
                    },
                ],
            });
            //
            if (response.offers)
                response.offers.sort((e1: { id: number }, e2: { id: number }) => {
                    return e2.id - e1.id;
                });
            //
            return response ? res.send(response) : res.sendStatus(404);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
export default new GetOwnedOffersController();

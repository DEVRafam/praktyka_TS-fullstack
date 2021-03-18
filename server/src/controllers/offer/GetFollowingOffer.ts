import { Response } from "express";
import { AuthorizedRequest } from "../../@types/authenticate";
import { Offer, Follow, User } from "../../services/Models";
//
class GetFollowingOffer {
    protected excludes = {
        fromOffer: ["createdAt", "creator_id", "advantages", "valueInUSD", "contact"],
        fromFollows: ["createdAt", "updatedAt"],
    };
    //
    async main(req: AuthorizedRequest, res: Response) {
        const response = await User.findOne({
            where: req.authorizedToken.id,
            include: [
                {
                    model: Follow,
                    as: "following",
                    attributes: { exclude: this.excludes.fromFollows },
                    include: [
                        {
                            model: Offer,
                            attributes: { exclude: this.excludes.fromOffer },
                        },
                    ],
                },
            ],
        });
        res.send(
            response.following
                .filter((el: any) => el.Offer.status === "DEFAULT")
                .map((el: any) => el.Offer)
                .reverse()
        );
    }
}
//
export default new GetFollowingOffer();

import { Response } from "express";
import { AuthorizedRequest } from "../../@types/authenticate";
import { Offer, Follow, User } from "../../services/Models";
//
class GetFollowingOffer {
    protected excludes = {
        fromUser: ["createdAt", "tokens", "password", "updatedAt", "role"],
        fromOffer: ["createdAt", "creator_id", "advantages", "valueInUSD", "contact"],
        fromFollows: ["createdAt", "updatedAt"],
    };
    //
    async main(req: AuthorizedRequest, res: Response) {
        const response = await User.findOne({
            where: req.authorizedToken.id,
            attributes: {
                exclude: this.excludes.fromUser,
            },
            include: [
                {
                    model: Follow,
                    as: "following",
                    attributes: { exclude: this.excludes.fromUser },
                    include: [
                        {
                            model: Offer,
                            attributes: { exclude: this.excludes.fromOffer },
                        },
                    ],
                },
            ],
        });
        response.following = response.following.filter((el: any) => el.Offer.status === "DEFAULT");
        res.send(response);
    }
}
//
export default new GetFollowingOffer();

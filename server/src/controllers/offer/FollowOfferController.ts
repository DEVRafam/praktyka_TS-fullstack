import { Response } from "express";
import { FollowRequest } from "../../@types/Offers";
import { Follow } from "../../services/Models";
//
class FollowOfferController {
    async main(req: FollowRequest, res: Response) {
        const follow = await Follow.findOne({
            where: { user_id: req.authorizedToken.id, offer_id: req.params.id },
        });
        //
        if (follow) await follow.destroy();
        else await Follow.create({ user_id: req.authorizedToken.id, offer_id: req.params.id });
        //
        res.sendStatus(200);
    }
}
export default new FollowOfferController();

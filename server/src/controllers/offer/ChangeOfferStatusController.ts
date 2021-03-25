import { Response } from "express";
import { ChangeStatusRequest } from "../../@types/Offers";
import { Offer } from "../../services/Models";
//
class ChangeOfferStatusController {
    async main(req: ChangeStatusRequest, res: Response) {
        try {
            const offer = await Offer.findOne({ where: { id: req.params.id } });
            if (!offer) return res.sendStatus(404);
            const { role, id } = req.authorizedToken;
            //
            // TRYING TO BAN OFFER
            //
            if (req.body.status === "BANNED") {
                const isAdmin = role === "ADMIN";
                if (!isAdmin) return res.sendStatus(401);
            }
            // TRYING TO HIDE/SOLD/RESTET
            else {
                const isEitherAdminOrOffersOwner = role === "ADMIN" || id == offer.creator_id;
                if (!isEitherAdminOrOffersOwner) return res.sendStatus(401);
            }
            //
            offer.update({ status: req.body.status });
            return res.sendStatus(200);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
export default new ChangeOfferStatusController();

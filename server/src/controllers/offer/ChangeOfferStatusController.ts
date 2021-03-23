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
            if (role !== "ADMIN" && id !== offer.creator_id) return res.sendStatus(401);
            //
            offer.update({ status: req.body.status });
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
export default new ChangeOfferStatusController();

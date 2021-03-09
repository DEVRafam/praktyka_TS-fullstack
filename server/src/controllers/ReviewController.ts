import { Review } from "../services/Models";
import { Response } from "express";
import { SetReviewRequest, DeleteRequest } from "../@types/reviews";
//
class ReviewController {
    async set(req: SetReviewRequest, res: Response) {
        try {
            // chect whether authenticated user has already reviewed certin dealer
            const currentReview = await Review.findOne({
                where: {
                    dealer_id: req.params.id,
                    reviewer_id: req.authorizedToken.id,
                },
            });
            if (currentReview) await currentReview.update({ score: req.body.score, explanation: req.body.explanation });
            else {
                await Review.create({
                    score: req.body.score,
                    dealer_id: req.params.id,
                    reviewer_id: req.authorizedToken.id,
                    explanation: req.body.explanation,
                });
            }
            return res.sendStatus(200);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
    //
    async delete(req: DeleteRequest, res: Response) {
        try {
            await Review.destroy({ where: { id: req.params.id } });
            res.sendStatus(200);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
//
export default new ReviewController();

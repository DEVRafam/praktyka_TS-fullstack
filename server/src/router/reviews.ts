import { Router } from "express";
//
import ReviewController from "../controllers/ReviewController";
import authorization from "../middlewares/authenticate";
import { SetReviewValidator, DeleteReviewValidator } from "../middlewares/ReviewValidator";
//
const router = Router();
//
router.post("/:id", [authorization, SetReviewValidator], (req: any, res: any) => ReviewController.set(req, res));
router.delete("/:id", [authorization, DeleteReviewValidator], (req: any, res: any) => ReviewController.delete(req, res));
//
export default router;

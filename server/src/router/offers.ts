import OfferController from "../controllers/OfferController";
import { Response, Router } from "express";

//
const router = Router();
//
router.get("/", (req: any, res: Response) => OfferController.getAll(req, res));
router.get("/:slug", (req: any, res: Response) => OfferController.getSingle(req, res));
//
export default router;

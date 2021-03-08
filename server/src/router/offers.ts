import OfferController from "../controllers/OfferController";
import { Response, Router } from "express";
import authorization from "../middlewares/authenticate";
import { CreateNewOfferValidator } from "../middlewares/OfferValidatiors";
//
const router = Router();
//
router.get("/", (req: any, res: Response) => OfferController.getAll(req, res));
router.get("/:slug", (req: any, res: Response) => OfferController.getSingle(req, res));
router.post("/", [authorization, CreateNewOfferValidator], (req: any, res: Response) => OfferController.create(req, res));
//
export default router;

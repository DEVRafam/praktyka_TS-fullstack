// controllers
import GetManyOffersController from "../controllers/offer/GetManyOffersController";
import GetSingleOfferController from "../controllers/offer/GetSingleOfferController";
import CreateNewOfferController from "../controllers/offer/CreateNewOfferController";
import DeleteOfferController from "../controllers/offer/DeleteOfferController";
// tools
import { Response, Router } from "express";
import authorization from "../middlewares/authenticate";
import { CreateNewOfferValidator } from "../middlewares/OfferValidatiors";
//
const router = Router();
//
router.get("/", (req: any, res: Response) => GetManyOffersController.main(req, res));
router.get("/:slug", (req: any, res: Response) => GetSingleOfferController.main(req, res));
router.post("/", [authorization, CreateNewOfferValidator], (req: any, res: Response) => CreateNewOfferController.main(req, res));
router.delete("/:id", [authorization], (req: any, res: Response) => DeleteOfferController.main(req, res));
//
export default router;

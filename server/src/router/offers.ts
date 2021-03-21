// controllers
import GetManyOffersController from "../controllers/offer/GetManyOffersController";
import GetSingleOfferController from "../controllers/offer/GetSingleOfferController";
import CreateNewOfferController from "../controllers/offer/CreateNewOfferController";
import DeleteOfferController from "../controllers/offer/DeleteOfferController";
import FollowOfferController from "../controllers/offer/FollowOfferController";
import RecommendationsOfferController from "../controllers/offer/RecommendationsOfferController";
import GetFollowingOfferController from "../controllers/offer/GetFollowingOfferController";
import GetOwnedOffersController from "../controllers/offer/GetOwnedOffersController";
// tools
import { Response, Router } from "express";
import authorization from "../middlewares/authenticate";
import { CreateNewOfferValidator, FollowOfferValidator } from "../middlewares/OfferValidatiors";
//
const router = Router();
//
router.get("/", (req: any, res: Response) => GetManyOffersController.main(req, res));
router.get("/:slug", (req: any, res: Response) => GetSingleOfferController.main(req, res));
router.get("/:slug/recommendations", (req: any, res: Response) => RecommendationsOfferController.main(req, res));
router.get("/my/following", [authorization], (req: any, res: Response) => GetFollowingOfferController.main(req, res));
router.get("/creator/:id", [authorization], (req: any, res: Response) => GetOwnedOffersController.main(req, res));
router.post("/", [authorization, CreateNewOfferValidator], (req: any, res: Response) => CreateNewOfferController.main(req, res));
router.post("/:id/follow", [authorization, FollowOfferValidator], (req: any, res: Response) => FollowOfferController.main(req, res));
router.delete("/:id", [authorization], (req: any, res: Response) => DeleteOfferController.main(req, res));
//
export default router;

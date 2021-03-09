import { Router } from "express";
const router = Router();
//
// router modules
//
import auth from "./auth";
import offers from "./offers";
import user from "./user";
import review from "./reviews";
//
router.use("/auth", auth);
router.use("/offer", offers);
router.use("/user", user);
router.use("/review", review);
//
// additional routes
//
import GetImagesController from "../controllers/GetImagesController";
router.get("/photo/:section/:folder/:image", GetImagesController.getImage);
router.get("/photo/avatar/:image", GetImagesController.getAvatar);
//
//
//
export default router;

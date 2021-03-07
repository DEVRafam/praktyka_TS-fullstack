import { Router } from "express";
const router = Router();
//
// router modules
//
import auth from "./auth";
import offers from "./offers";
//
router.use("/auth", auth);
router.use("/offer", offers);
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

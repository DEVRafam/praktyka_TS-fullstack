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
import GetPhotoController from "../controllers/GetPhotoController";
router.get("/photo/:section/:folder/:image", GetPhotoController.getImage);
//
//
//
export default router;

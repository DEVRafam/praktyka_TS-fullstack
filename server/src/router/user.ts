import UserController from "../controllers/UserController";
import { Router } from "express";
const router = Router();
import authorization from "../middlewares/authenticate";
//
router.post("/change-avatar", [authorization], UserController.changeAvatar);
//
export default router;

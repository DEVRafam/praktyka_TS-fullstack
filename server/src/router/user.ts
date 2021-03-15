import UserController from "../controllers/UserController";
import { Router } from "express";
const router = Router();
import authorization from "../middlewares/authenticate";
//
router.get("/:id", (req: any, res: any) => UserController.profileData(req, res));
router.post("/change-avatar", [authorization], (req: any, res: any) => UserController.changeAvatar(req, res));
//
export default router;

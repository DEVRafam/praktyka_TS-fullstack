import UserController from "../controllers/UserController";
import { Router } from "express";
const router = Router();
import authorization from "../middlewares/authenticate";
import { DeleteAccountValidator, ChangeAvatarValidator } from "../middlewares/UserValidators";
//
router.get("/:id", (req: any, res: any) => UserController.profileData(req, res));
router.post("/change-avatar", [authorization, ChangeAvatarValidator], (req: any, res: any) => UserController.changeAvatar(req, res));
router.post("/:id/delete", [authorization, DeleteAccountValidator], (req: any, res: any) => UserController.deleteUser(req, res));
//
export default router;

import { Router } from "express";
// controllers
import LoginController from "../controllers/auth/LoginController";
import RegisterController from "../controllers/auth/RegisterController";
import LogoutController from "../controllers/auth/LogoutController";
import RefreshTokenController from "../controllers/auth/RefreshTokenController";
// validators
import { LoginRequestValidate, RegisterRequestValidator, RefreshTokenValidate } from "../middlewares/AuthValidators";
import authorization from "../middlewares/authenticate";
//
const router = Router();
//
router.post("/login", [LoginRequestValidate], LoginController.login);
router.post("/register", [RegisterRequestValidator], RegisterController.register);
router.post("/logout", [authorization], LogoutController.logout);
router.post("/refresh-token", [RefreshTokenValidate], (req: any, res: any) => RefreshTokenController.refresh(req, res));
//
router.get("/authorization-test", authorization, (req: any, res: any) => {
    return res.send("Authenticated successfully");
});
//
export default router;

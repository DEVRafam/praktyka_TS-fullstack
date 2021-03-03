import { Router } from "express";
import AuthController from "../controllers/AuthController";
//
const router = Router();
//
router.get("/login", (req, res) => AuthController.login(req, res));
//
export default router;

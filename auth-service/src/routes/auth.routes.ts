import { Router } from "express";
import {AuthController} from "../controllers/auth.controller";

const authController = new AuthController();
const router = Router();

router.post("/login", authController.login);
router.get("/profile", authController.authenticate, authController.profile);

export default router;

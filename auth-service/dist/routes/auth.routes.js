"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authController = new auth_controller_1.AuthController();
const router = (0, express_1.Router)();
router.post("/login", authController.login);
router.get("/profile", authController.authenticate, authController.profile);
exports.default = router;

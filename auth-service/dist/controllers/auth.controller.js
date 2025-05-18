"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const user_service_1 = require("../services/user.service");
const auth_middleware_1 = require("../middlewares/auth.middleware");
class AuthController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield this.authService.login(email, password);
                return res.json({ token: result.token, user: result.user });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : "Unknown error";
                return res.status(401).json({ message });
            }
        });
        this.profile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                if (!userId) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                const user = yield (0, user_service_1.getUserById)(userId);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                const { password } = user, userData = __rest(user, ["password"]);
                return res.json(userData);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : "Server error";
                return res.status(500).json({ message });
            }
        });
        this.authenticate = auth_middleware_1.authenticateJWT;
        this.authService = new auth_service_1.AuthService();
    }
}
exports.AuthController = AuthController;

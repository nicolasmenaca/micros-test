import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { getUserById } from "../services/user.service";
import { authenticateJWT, AuthRequest } from "../middlewares/auth.middleware";

export class AuthController {
    private readonly authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);
            return res.json({ token: result.token, user: result.user });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Unknown error";
            return res.status(401).json({ message });
        }
    };

    profile = async (req: AuthRequest, res: Response): Promise<Response> => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const user = await getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const { password, ...userData } = user;
            return res.json(userData);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Server error";
            return res.status(500).json({ message });
        }
    };

    authenticate = authenticateJWT;
}

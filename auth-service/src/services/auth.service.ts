import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "./user.service";
import { UserDTO } from "../dtos/user.dto";

export class AuthService {
    async login(email: string, password: string): Promise<{ token: string; user: Omit<UserDTO, "password"> }> {
        const user = await getUserByEmail(email);
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error("Invalid credentials");
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        const { password: _, ...userWithoutPassword } = user;
        return { token, user: userWithoutPassword };
    }
}

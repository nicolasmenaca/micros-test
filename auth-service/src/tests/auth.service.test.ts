import { AuthService } from "../services/auth.service";
import * as userService from "../services/user.service";
import { UserDTO } from "../dtos/user.dto";

jest.mock("bcryptjs", () => ({
    compare: jest.fn()
}));
jest.mock("jsonwebtoken", () => ({
    sign: jest.fn()
}));

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

process.env.JWT_SECRET = "clave123";

describe("AuthService", () => {
    const authService = new AuthService();

    const mockUser: UserDTO = {
        id: 1,
        nombre: "Juan",
        apellido: "Pérez",
        alias: "jperez",
        fechaNacimiento: new Date("1990-01-01").toISOString(),
        email: "juan@example.com",
        password: "$2b$10$hashedpass",
        role: "user"
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("debe retornar token y usuario sin contraseña si las credenciales son válidas", async () => {
        jest.spyOn(userService, "getUserByEmail").mockResolvedValue(mockUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (jwt.sign as jest.Mock).mockReturnValue("mocked.jwt.token");

        const result = await authService.login("juan@example.com", "secret123");

        expect(result.token).toBe("mocked.jwt.token");
        expect(result.user.email).toBe("juan@example.com");
        expect("password" in result.user).toBe(false);
    });

    it("debe lanzar error si el usuario no existe", async () => {
        jest.spyOn(userService, "getUserByEmail").mockResolvedValue(null);

        await expect(authService.login("wrong@example.com", "123"))
            .rejects.toThrow("Invalid credentials");
    });

    it("debe lanzar error si la contraseña no es válida", async () => {
        jest.spyOn(userService, "getUserByEmail").mockResolvedValue(mockUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        await expect(authService.login("juan@example.com", "wrongpass"))
            .rejects.toThrow("Invalid credentials");
    });
});

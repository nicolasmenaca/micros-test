"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("../services/auth.service");
const userService = __importStar(require("../services/user.service"));
jest.mock("bcryptjs", () => ({
    compare: jest.fn()
}));
jest.mock("jsonwebtoken", () => ({
    sign: jest.fn()
}));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
process.env.JWT_SECRET = "clave123";
describe("AuthService", () => {
    const authService = new auth_service_1.AuthService();
    const mockUser = {
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
    it("debe retornar token y usuario sin contraseña si las credenciales son válidas", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(userService, "getUserByEmail").mockResolvedValue(mockUser);
        bcryptjs_1.default.compare.mockResolvedValue(true);
        jsonwebtoken_1.default.sign.mockReturnValue("mocked.jwt.token");
        const result = yield authService.login("juan@example.com", "secret123");
        expect(result.token).toBe("mocked.jwt.token");
        expect(result.user.email).toBe("juan@example.com");
        expect("password" in result.user).toBe(false);
    }));
    it("debe lanzar error si el usuario no existe", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(userService, "getUserByEmail").mockResolvedValue(null);
        yield expect(authService.login("wrong@example.com", "123"))
            .rejects.toThrow("Invalid credentials");
    }));
    it("debe lanzar error si la contraseña no es válida", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(userService, "getUserByEmail").mockResolvedValue(mockUser);
        bcryptjs_1.default.compare.mockResolvedValue(false);
        yield expect(authService.login("juan@example.com", "wrongpass"))
            .rejects.toThrow("Invalid credentials");
    }));
});

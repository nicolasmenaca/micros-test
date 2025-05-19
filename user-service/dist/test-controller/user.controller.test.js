"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
describe("UserController", () => {
    const mockService = {
        createUser: jest.fn(),
        findByEmail: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
        updateUser: jest.fn(),
        deleteUser: jest.fn(),
    };
    const controller = new user_controller_1.UserController(mockService);
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };
    const next = jest.fn();
    const user = {
        id: 1,
        nombre: "Juan",
        apellido: "Pérez",
        alias: "jperez",
        fechaNacimiento: new Date("1990-01-01"),
        email: "juan@example.com",
        password: "hashedpass",
    };
    beforeEach(() => jest.clearAllMocks());
    it("crea un usuario", async () => {
        const req = { body: user };
        const res = mockResponse();
        mockService.createUser.mockResolvedValue(user);
        await controller.create(req, res, next);
        expect(mockService.createUser).toHaveBeenCalledWith(user);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(user);
    });
    it("busca por email y lo encuentra", async () => {
        const req = { params: { email: "juan@example.com" } };
        const res = mockResponse();
        mockService.findByEmail.mockResolvedValue(user);
        await controller.getByEmail(req, res, next);
        expect(mockService.findByEmail).toHaveBeenCalledWith("juan@example.com");
        expect(res.json).toHaveBeenCalledWith(user);
    });
    it("busca por email y no lo encuentra", async () => {
        const req = { params: { email: "notfound@example.com" } };
        const res = mockResponse();
        mockService.findByEmail.mockResolvedValue(null);
        await controller.getByEmail(req, res, next);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Usuario no encontrado" });
    });
    it("busca por ID y lo encuentra", async () => {
        const req = { params: { id: "1" } };
        const res = mockResponse();
        mockService.findById.mockResolvedValue(user);
        await controller.getById(req, res, next);
        expect(mockService.findById).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith(user);
    });
    it("busca por ID y no lo encuentra", async () => {
        const req = { params: { id: "2" } };
        const res = mockResponse();
        mockService.findById.mockResolvedValue(null);
        await controller.getById(req, res, next);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Usuario no encontrado" });
    });
    it("obtiene todos los usuarios", async () => {
        const res = mockResponse();
        const users = [user];
        mockService.findAll.mockResolvedValue(users);
        await controller.getAll({}, res, next);
        expect(res.json).toHaveBeenCalledWith(users);
    });
    it("actualiza un usuario", async () => {
        const req = { params: { id: "1" }, body: { nombre: "Juan actualizado" } };
        const res = mockResponse();
        await controller.update(req, res, next);
        expect(mockService.updateUser).toHaveBeenCalledWith(1, req.body);
        expect(res.json).toHaveBeenCalledWith({ message: "Usuario actualizado" });
    });
    it("elimina un usuario", async () => {
        const req = { params: { id: "1" } };
        const res = mockResponse();
        await controller.delete(req, res, next);
        expect(mockService.deleteUser).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({ message: "Usuario eliminado" });
    });
});

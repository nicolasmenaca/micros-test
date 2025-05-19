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
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const post_controller_1 = require("../../controllers/post.controller");
(0, globals_1.describe)("PostController", () => {
    const mockService = {
        create: globals_1.jest.fn(),
        findAll: globals_1.jest.fn(),
        findById: globals_1.jest.fn(),
        delete: globals_1.jest.fn()
    };
    const controller = new post_controller_1.PostController(mockService);
    const mockResponse = () => {
        const res = {
            status: globals_1.jest.fn().mockReturnThis(),
            json: globals_1.jest.fn().mockReturnThis(),
        };
        return res;
    };
    const mockPost = {
        id: 1,
        userId: 1,
        content: "Hola",
        createdAt: new Date(),
        likes: []
    };
    (0, globals_1.beforeEach)(() => {
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.it)("crea un nuevo post", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = { body: { userId: 1, content: "Hola" } };
        const res = mockResponse();
        mockService.create.mockResolvedValue(mockPost);
        yield controller.create(req, res);
        (0, globals_1.expect)(mockService.create).toHaveBeenCalledWith(req.body);
        (0, globals_1.expect)(res.status).toHaveBeenCalledWith(201);
        (0, globals_1.expect)(res.json).toHaveBeenCalledWith(mockPost);
    }));
    (0, globals_1.it)("devuelve todos los posts", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = mockResponse();
        mockService.findAll.mockResolvedValue([mockPost]);
        yield controller.getAll({}, res);
        (0, globals_1.expect)(res.json).toHaveBeenCalledWith([mockPost]);
    }));
    (0, globals_1.it)("devuelve un post por ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = { params: { id: "1" } };
        const res = mockResponse();
        mockService.findById.mockResolvedValue(mockPost);
        yield controller.getById(req, res);
        (0, globals_1.expect)(res.json).toHaveBeenCalledWith(mockPost);
    }));
    (0, globals_1.it)("retorna 404 si no encuentra el post", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = { params: { id: "1" } };
        const res = mockResponse();
        mockService.findById.mockResolvedValue(null);
        yield controller.getById(req, res);
        (0, globals_1.expect)(res.status).toHaveBeenCalledWith(404);
        (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ message: "Not found" });
    }));
    (0, globals_1.it)("elimina un post", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = { params: { id: "1" } };
        const res = mockResponse();
        yield controller.delete(req, res);
        (0, globals_1.expect)(mockService.delete).toHaveBeenCalledWith(1);
        (0, globals_1.expect)(res.json).toHaveBeenCalledWith({ message: "Post deleted" });
    }));
});

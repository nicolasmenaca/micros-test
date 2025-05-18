import { Request, Response } from "express";
import { describe, it, beforeEach, expect, jest } from "@jest/globals";
import { PostService } from "../../services/post.service";
import { PostController } from "../../controllers/post.controller";
import { Post } from "../../entities/post.entitiy";

describe("PostController", () => {
    const mockService: jest.Mocked<PostService> = {
        create: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        delete: jest.fn()
    } as any;

    const controller = new PostController(mockService);

    const mockResponse = (): jest.Mocked<Response> => {
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        } as unknown as jest.Mocked<Response>;
        return res;
    };


    const mockPost: Post = {
        id: 1,
        userId: 1,
        content: "Hola",
        createdAt: new Date(),
        likes: []
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("crea un nuevo post", async () => {
        const req = { body: { userId: 1, content: "Hola" } } as Request;
        const res = mockResponse();
        mockService.create.mockResolvedValue(mockPost);

        await controller.create(req, res);

        expect(mockService.create).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockPost);
    });

    it("devuelve todos los posts", async () => {
        const res = mockResponse();
        mockService.findAll.mockResolvedValue([mockPost]);

        await controller.getAll({} as Request, res);

        expect(res.json).toHaveBeenCalledWith([mockPost]);
    });

    it("devuelve un post por ID", async () => {
        const req = { params: { id: "1" } } as unknown as Request;
        const res = mockResponse();
        mockService.findById.mockResolvedValue(mockPost);

        await controller.getById(req, res);

        expect(res.json).toHaveBeenCalledWith(mockPost);
    });

    it("retorna 404 si no encuentra el post", async () => {
        const req = { params: { id: "1" } } as unknown as Request;
        const res = mockResponse();
        mockService.findById.mockResolvedValue(null);

        await controller.getById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Not found" });
    });

    it("elimina un post", async () => {
        const req = { params: { id: "1" } } as unknown as Request;
        const res = mockResponse();

        await controller.delete(req, res);

        expect(mockService.delete).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({ message: "Post deleted" });
    });
});

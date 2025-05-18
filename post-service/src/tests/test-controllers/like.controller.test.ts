import { Request, Response } from "express";
import { LikeService } from "../../services/like.service";
import { LikeController } from "../../controllers/like.controller";
import { Like } from "../../entities/like.entity";

describe("LikeController", () => {
    const mockService: jest.Mocked<LikeService> = {
        likePost: jest.fn(),
        countLikes: jest.fn()
    } as any;

    const controller = new LikeController(mockService);

    const mockResponse = (): jest.Mocked<Response> => {
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        } as unknown as jest.Mocked<Response>;
        return res;
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("debe dar like a un post", async () => {
        const req = { body: { postId: 1, userId: 2 } } as Request;
        const res = mockResponse();
        const mockLike: Like = { id: 1, postId: 1, userId: 2, post: {} as any };

        mockService.likePost.mockResolvedValue(mockLike);

        await controller.like(req, res);

        expect(mockService.likePost).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockLike);
    });

    it("debe manejar error al dar like", async () => {
        const req = { body: { postId: 1, userId: 2 } } as Request;
        const res = mockResponse();

        mockService.likePost.mockRejectedValue(new Error("User already liked this post"));

        await controller.like(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "User already liked this post" });
    });

    it("debe contar los likes de un post", async () => {
        const req = { params: { postId: "1" } } as unknown as Request;
        const res = mockResponse();

        mockService.countLikes.mockResolvedValue(5);

        await controller.count(req, res);

        expect(mockService.countLikes).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({ likes: 5 });
    });
});

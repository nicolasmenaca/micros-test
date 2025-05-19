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
const like_controller_1 = require("../../controllers/like.controller");
describe("LikeController", () => {
    const mockService = {
        likePost: jest.fn(),
        countLikes: jest.fn()
    };
    const controller = new like_controller_1.LikeController(mockService);
    const mockResponse = () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        return res;
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("debe dar like a un post", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = { body: { postId: 1, userId: 2 } };
        const res = mockResponse();
        const mockLike = { id: 1, postId: 1, userId: 2, post: {} };
        mockService.likePost.mockResolvedValue(mockLike);
        yield controller.like(req, res);
        expect(mockService.likePost).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockLike);
    }));
    it("debe manejar error al dar like", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = { body: { postId: 1, userId: 2 } };
        const res = mockResponse();
        mockService.likePost.mockRejectedValue(new Error("User already liked this post"));
        yield controller.like(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "User already liked this post" });
    }));
    it("debe contar los likes de un post", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = { params: { postId: "1" } };
        const res = mockResponse();
        mockService.countLikes.mockResolvedValue(5);
        yield controller.count(req, res);
        expect(mockService.countLikes).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({ likes: 5 });
    }));
});

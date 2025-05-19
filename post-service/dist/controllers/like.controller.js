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
exports.LikeController = void 0;
class LikeController {
    constructor(service) {
        this.service = service;
        this.like = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const like = yield this.service.likePost(req.body);
                res.status(201).json(like);
            }
            catch (e) {
                res.status(400).json({ message: e instanceof Error ? e.message : e });
            }
        });
        this.unlike = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { postId, userId } = req.body;
            try {
                yield this.service.unlikePost(postId, userId);
                res.status(200).json({ message: "Like eliminado" });
            }
            catch (e) {
                res.status(400).json({ message: e instanceof Error ? e.message : e });
            }
        });
        this.count = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const count = yield this.service.countLikes(Number(req.params.postId));
            res.json({ likes: count });
        });
    }
}
exports.LikeController = LikeController;

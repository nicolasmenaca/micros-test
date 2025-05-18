"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeController = void 0;
class LikeController {
    constructor(service) {
        this.service = service;
        this.like = async (req, res) => {
            try {
                const like = await this.service.likePost(req.body);
                res.status(201).json(like);
            }
            catch (e) {
                res.status(400).json({ message: e instanceof Error ? e.message : e });
            }
        };
        this.count = async (req, res) => {
            const count = await this.service.countLikes(Number(req.params.postId));
            res.json({ likes: count });
        };
    }
}
exports.LikeController = LikeController;

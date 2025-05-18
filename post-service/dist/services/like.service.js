"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeService = void 0;
class LikeService {
    constructor(repo) {
        this.repo = repo;
    }
    async likePost(data) {
        const existing = await this.repo.findOneBy({ postId: data.postId, userId: data.userId });
        if (existing)
            throw new Error("User already liked this post");
        const like = this.repo.create(data);
        return this.repo.save(like);
    }
    countLikes(postId) {
        return this.repo.countBy({ postId });
    }
}
exports.LikeService = LikeService;

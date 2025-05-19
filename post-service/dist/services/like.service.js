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
exports.LikeService = void 0;
class LikeService {
    constructor(repo) {
        this.repo = repo;
    }
    likePost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield this.repo.findOneBy({ postId: data.postId, userId: data.userId });
            if (existing)
                throw new Error("User already liked this post");
            const like = this.repo.create(data);
            return this.repo.save(like);
        });
    }
    unlikePost(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const like = yield this.repo.findOneBy({ postId, userId });
            if (!like)
                throw new Error("Like no existe");
            return this.repo.remove(like);
        });
    }
    countLikes(postId) {
        return this.repo.countBy({ postId });
    }
}
exports.LikeService = LikeService;

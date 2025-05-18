"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
class PostService {
    constructor(repo) {
        this.repo = repo;
    }
    create(data) {
        const post = this.repo.create(data);
        return this.repo.save(post);
    }
    findAll() {
        return this.repo.find({ relations: ["likes"] });
    }
    findById(id) {
        return this.repo.findOne({ where: { id }, relations: ["likes"] });
    }
    delete(id) {
        return this.repo.delete(id);
    }
}
exports.PostService = PostService;

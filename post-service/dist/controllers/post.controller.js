"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
class PostController {
    constructor(service) {
        this.service = service;
        this.create = async (req, res) => {
            try {
                const post = await this.service.create(req.body);
                res.status(201).json(post);
            }
            catch (e) {
                res.status(400).json({ message: e instanceof Error ? e.message : e });
            }
        };
        this.getAll = async (_req, res) => {
            const posts = await this.service.findAll();
            res.json(posts);
        };
        this.getById = async (req, res) => {
            const post = await this.service.findById(Number(req.params.id));
            if (!post) {
                res.status(404).json({ message: "Not found" });
                return;
            }
            res.json(post);
        };
        this.delete = async (req, res) => {
            await this.service.delete(Number(req.params.id));
            res.json({ message: "Post deleted" });
        };
    }
}
exports.PostController = PostController;

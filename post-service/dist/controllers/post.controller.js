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
exports.PostController = void 0;
class PostController {
    constructor(service) {
        this.service = service;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this.service.create(req.body);
                res.status(201).json(post);
            }
            catch (e) {
                res.status(400).json({ message: e instanceof Error ? e.message : e });
            }
        });
        this.getAll = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.service.findAll();
            res.json(posts);
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const post = yield this.service.findById(Number(req.params.id));
            if (!post) {
                res.status(404).json({ message: "Not found" });
                return;
            }
            res.json(post);
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.service.delete(Number(req.params.id));
            res.json({ message: "Post deleted" });
        });
    }
}
exports.PostController = PostController;

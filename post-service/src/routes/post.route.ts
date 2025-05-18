import { Router } from "express";
import { DataSource } from "typeorm";
import { Like } from "../entities/like.entity";
import { PostService } from "../services/post.service";
import { LikeService } from "../services/like.service";
import { PostController } from "../controllers/post.controller";
import { LikeController } from "../controllers/like.controller";
import {Post} from "../entities/post.entitiy";

export function initPostRoutes(dataSource: DataSource) {
    const router = Router();

    const postRepo = dataSource.getRepository(Post);
    const likeRepo = dataSource.getRepository(Like);

    const postController = new PostController(new PostService(postRepo));
    const likeController = new LikeController(new LikeService(likeRepo));

    router.post("/posts", postController.create);
    router.get("/posts", postController.getAll);
    router.get("/posts/:id", postController.getById);
    router.delete("/posts/:id", postController.delete);

    router.post("/likes", likeController.like);
    router.get("/likes/:postId", likeController.count);

    return router;
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPostRoutes = initPostRoutes;
const express_1 = require("express");
const like_entity_1 = require("../entities/like.entity");
const post_service_1 = require("../services/post.service");
const like_service_1 = require("../services/like.service");
const post_controller_1 = require("../controllers/post.controller");
const like_controller_1 = require("../controllers/like.controller");
const post_entitiy_1 = require("../entities/post.entitiy");
function initPostRoutes(dataSource) {
    const router = (0, express_1.Router)();
    const postRepo = dataSource.getRepository(post_entitiy_1.Post);
    const likeRepo = dataSource.getRepository(like_entity_1.Like);
    const postController = new post_controller_1.PostController(new post_service_1.PostService(postRepo));
    const likeController = new like_controller_1.LikeController(new like_service_1.LikeService(likeRepo));
    router.post("/posts", postController.create);
    router.get("/posts", postController.getAll);
    router.get("/posts/:id", postController.getById);
    router.delete("/posts/:id", postController.delete);
    router.post("/likes", likeController.like);
    router.post("/unlike", likeController.unlike);
    router.get("/likes/:postId", likeController.count);
    return router;
}

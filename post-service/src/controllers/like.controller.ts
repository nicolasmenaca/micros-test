import { Request, Response } from "express";
import { LikeService } from "../services/like.service";

export class LikeController {
  constructor(private service: LikeService) {}

  like = async (req: Request, res: Response) => {
    try {
      const like = await this.service.likePost(req.body);
      res.status(201).json(like);
    } catch (e) {
      res.status(400).json({ message: e instanceof Error ? e.message : e });
    }
  };
  unlike = async (req: Request, res: Response) => {
    const { postId, userId } = req.body;
    try {
      await this.service.unlikePost(postId, userId);
      res.status(200).json({ message: "Like eliminado" });
    } catch (e) {
      res.status(400).json({ message: e instanceof Error ? e.message : e });
    }
  };
  count = async (req: Request, res: Response) => {
    const count = await this.service.countLikes(Number(req.params.postId));
    res.json({ likes: count });
  };
}
import { Request, Response } from "express";
import { PostService } from "../services/post.service";

export class PostController {
  constructor(private service: PostService) {}

  create = async (req: Request, res: Response) => {
    try {
      const post = await this.service.create(req.body);
      res.status(201).json(post);
    } catch (e) {
      res.status(400).json({ message: e instanceof Error ? e.message : e });
    }
  };

  getAll = async (_req: Request, res: Response) => {
    const posts = await this.service.findAll();
    res.json(posts);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const post = await this.service.findById(Number(req.params.id));
    if (!post) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json(post);
  };

  delete = async (req: Request, res: Response) => {
    await this.service.delete(Number(req.params.id));
    res.json({ message: "Post deleted" });
  };
}

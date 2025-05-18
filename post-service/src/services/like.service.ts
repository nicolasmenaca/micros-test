import { Repository } from "typeorm";
import { Like } from "../entities/like.entity";
import {CreateLikeDTO} from "../dtos/create.like.dto";

export class LikeService {
  constructor(private repo: Repository<Like>) {}

  async likePost(data: CreateLikeDTO) {
    const existing = await this.repo.findOneBy({ postId: data.postId, userId: data.userId });
    if (existing) throw new Error("User already liked this post");
    const like = this.repo.create(data);
    return this.repo.save(like);
  }

  countLikes(postId: number) {
    return this.repo.countBy({ postId });
  }
}
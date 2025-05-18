import { Repository } from "typeorm";
import {Post} from "../entities/post.entitiy";
import {CreatePostDTO} from "../dtos/create.post.dto";

export class PostService {
  constructor(private repo: Repository<Post>) {}

  create(data: CreatePostDTO) {
    const post = this.repo.create(data);
    return this.repo.save(post);
  }

  findAll() {
    return this.repo.find({ relations: ["likes"] });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id }, relations: ["likes"] });
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}

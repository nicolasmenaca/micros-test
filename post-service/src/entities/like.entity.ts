import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from "typeorm";
import {Post} from "./post.entitiy";

@Entity()
@Unique(["postId", "userId"])
export class Like {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    postId!: number;

    @Column()
    userId!: number;

    @ManyToOne(() => Post, post => post.likes, { onDelete: "CASCADE" })
    post!: Post;
}

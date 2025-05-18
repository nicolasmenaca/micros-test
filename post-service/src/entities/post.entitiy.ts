import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Like } from "./like.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: number; // ID del usuario del microservicio externo

    @Column({ length: 500 })
    content!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(() => Like, like => like.post)
    likes!: Like[];
}

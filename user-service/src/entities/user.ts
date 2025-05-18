import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    nombre!: string;

    @Column({ length: 100 })
    apellido!: string;

    @Column({ length: 50, unique: true })
    alias!: string;

    @Column({ type: "date" })
    fechaNacimiento!: Date;

    @Column({ length: 150, unique: true })
    email!: string;

    @Column()
    password!: string;
}

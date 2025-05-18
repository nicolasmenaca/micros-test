import { Repository } from "typeorm";
import { User } from "../entities/user";
import bcrypt from "bcryptjs";

export class UserService {
    constructor(private userRepo: Repository<User>) {}

    async createUser(data: Partial<User>) {
        const user = this.userRepo.create({
            ...data,
            password: await bcrypt.hash(data.password!, 10),
        });
        return this.userRepo.save(user);
    }

    findByEmail(email: string) {
        return this.userRepo.findOneBy({ email });
    }

    findById(id: number) {
        return this.userRepo.findOneBy({ id });
    }

    findAll() {
        return this.userRepo.find();
    }

    async updateUser(id: number, data: Partial<User>) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        return this.userRepo.update(id, data);
    }

    deleteUser(id: number) {
        return this.userRepo.delete(id);
    }
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async createUser(data) {
        const user = this.userRepo.create({
            ...data,
            password: await bcryptjs_1.default.hash(data.password, 10),
        });
        return this.userRepo.save(user);
    }
    findByEmail(email) {
        return this.userRepo.findOneBy({ email });
    }
    findById(id) {
        return this.userRepo.findOneBy({ id });
    }
    findAll() {
        return this.userRepo.find();
    }
    async updateUser(id, data) {
        if (data.password) {
            data.password = await bcryptjs_1.default.hash(data.password, 10);
        }
        return this.userRepo.update(id, data);
    }
    deleteUser(id) {
        return this.userRepo.delete(id);
    }
}
exports.UserService = UserService;

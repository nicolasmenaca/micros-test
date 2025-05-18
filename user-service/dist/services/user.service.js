"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    createUser(data) {
        const user = this.userRepo.create(data);
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
    updateUser(id, data) {
        return this.userRepo.update(id, data);
    }
    deleteUser(id) {
        return this.userRepo.delete(id);
    }
}
exports.UserService = UserService;

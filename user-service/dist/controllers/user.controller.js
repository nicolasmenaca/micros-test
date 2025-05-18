"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(service) {
        this.service = service;
        this.create = async (req, res, next) => {
            try {
                const user = await this.service.createUser(req.body);
                res.status(201).json(user);
            }
            catch (error) {
                next(error);
            }
        };
        this.getByEmail = async (req, res, next) => {
            try {
                const user = await this.service.findByEmail(req.params.email);
                if (!user) {
                    res.status(404).json({ message: "Usuario no encontrado" });
                    return;
                }
                res.json(user);
            }
            catch (error) {
                next(error);
            }
        };
        this.getById = async (req, res, next) => {
            try {
                const user = await this.service.findById(Number(req.params.id));
                if (!user) {
                    res.status(404).json({ message: "Usuario no encontrado" });
                    return;
                }
                res.json(user);
            }
            catch (error) {
                next(error);
            }
        };
        this.getAll = async (_req, res, next) => {
            try {
                const users = await this.service.findAll();
                res.json(users);
            }
            catch (error) {
                next(error);
            }
        };
        this.update = async (req, res, next) => {
            try {
                await this.service.updateUser(Number(req.params.id), req.body);
                res.json({ message: "Usuario actualizado" });
            }
            catch (error) {
                next(error);
            }
        };
        this.delete = async (req, res, next) => {
            try {
                await this.service.deleteUser(Number(req.params.id));
                res.json({ message: "Usuario eliminado" });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.UserController = UserController;

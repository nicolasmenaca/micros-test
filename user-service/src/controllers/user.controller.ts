import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    constructor(private service: UserService) {}

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await this.service.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    };

    getByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await this.service.findByEmail(req.params.email);
            if (!user) {
                res.status(404).json({ message: "Usuario no encontrado" });
                return;
            }
            res.json(user);
        } catch (error) {
            next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await this.service.findById(Number(req.params.id));
            if (!user) {
                res.status(404).json({ message: "Usuario no encontrado" });
                return;
            }
            res.json(user);
        } catch (error) {
            next(error);
        }
    };

    getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users = await this.service.findAll();
            res.json(users);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.service.updateUser(Number(req.params.id), req.body);
            res.json({ message: "Usuario actualizado" });
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.service.deleteUser(Number(req.params.id));
            res.json({ message: "Usuario eliminado" });
        } catch (error) {
            next(error);
        }
    };
}

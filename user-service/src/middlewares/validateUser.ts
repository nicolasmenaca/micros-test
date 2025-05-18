import { Request, Response, NextFunction } from "express";

export const validateUser = (req: Request, res: Response, next: NextFunction): void => {
    const { nombre, apellido, alias, fechaNacimiento, email, password } = req.body;

    if (!nombre || !apellido || !alias || !fechaNacimiento || !email || !password) {
        res.status(400).json({ message: "Todos los campos son obligatorios" });
        return;
    }

    next();
};

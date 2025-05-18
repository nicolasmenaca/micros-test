"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const validateUser = (req, res, next) => {
    const { nombre, apellido, alias, fechaNacimiento, email, password } = req.body;
    if (!nombre || !apellido || !alias || !fechaNacimiento || !email || !password) {
        res.status(400).json({ message: "Todos los campos son obligatorios" });
        return;
    }
    next();
};
exports.validateUser = validateUser;

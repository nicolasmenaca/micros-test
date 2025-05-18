import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user";
import {validateUser} from "../middlewares/validateUser";

const router = Router();

const userRepo = AppDataSource.getRepository(User);
const service = new UserService(userRepo);
const controller = new UserController(service);

router.post("/", validateUser, controller.create);
router.get("/", controller.getAll);
router.get("/email/:email", controller.getByEmail);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;

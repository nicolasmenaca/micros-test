import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/user.routes";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const swaggerPath = path.join(__dirname, "docs", "swagger.yaml");
const swaggerDocument = YAML.load(swaggerPath);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT ? Number(process.env.PORT) : 3002;

AppDataSource.initialize()
    .then(() => {
        app.use("/users", userRoutes);
        app.listen(PORT, () => {
            console.log(`User service running on port ${PORT}`);
            console.log(`Swagger docs available at http://localhost:${PORT}/api/docs`);
        });
    })
    .catch((err) => {
        console.error("Error al conectar a la base de datos", err);
    });

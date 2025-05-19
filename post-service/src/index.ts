import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source/data-source";
import { initPostRoutes } from "./routes/post.route";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const swaggerDocument = YAML.load(path.join(__dirname, "docs", "swagger.yaml"));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT ? Number(process.env.PORT) : 3003;

AppDataSource.initialize().then(() => {
    app.use("/api", initPostRoutes(AppDataSource));
    app.listen(PORT, () => {
        console.log(`Post service running on port ${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api/docs`);
    });
}).catch((error) => {
    console.error("Error connecting to the database:", error);
});

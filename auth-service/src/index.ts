import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import fs from "fs";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const envPath = path.resolve(process.cwd(), ".env");
console.log(`Buscando archivo .env en: ${envPath}`);
console.log(`¿Existe el archivo .env? ${fs.existsSync(envPath)}`);

dotenv.config();

console.log("Variables de entorno cargadas:", {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET ? "***" : "no definida",
    USER_SERVICE_URL: process.env.USER_SERVICE_URL ?? "http://localhost:3002",
});

const app = express();
app.use(express.json());

const swaggerDocument = YAML.load(path.join(__dirname, "..", "src", "docs", "swagger.yaml"));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use("/api", authRoutes);

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Auth service running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api/docs`);
});

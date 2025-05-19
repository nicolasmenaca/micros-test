"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const envPath = path_1.default.resolve(process.cwd(), ".env");
console.log(`Buscando archivo .env en: ${envPath}`);
console.log(`¿Existe el archivo .env? ${fs_1.default.existsSync(envPath)}`);
dotenv_1.default.config();
console.log("Variables de entorno cargadas:", {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET ? "***" : "no definida",
    USER_SERVICE_URL: (_a = process.env.USER_SERVICE_URL) !== null && _a !== void 0 ? _a : "http://localhost:3002",
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, "docs", "swagger.yaml"));
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use((0, cors_1.default)());
app.use("/api", auth_routes_1.default);
const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api/docs`);
});

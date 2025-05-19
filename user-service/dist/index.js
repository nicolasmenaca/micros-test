"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, "..", "src", "docs", "swagger.yaml"));
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
const PORT = process.env.PORT ? Number(process.env.PORT) : 3002;
data_source_1.AppDataSource.initialize()
    .then(() => {
    app.use("/users", user_routes_1.default);
    app.listen(PORT, () => {
        console.log(`User service running on port ${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api/docs`);
    });
})
    .catch((err) => {
    console.error("Error al conectar a la base de datos", err);
});

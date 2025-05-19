"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./data-source/data-source");
const post_route_1 = require("./routes/post.route");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, "docs", "swagger.yaml"));
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
const PORT = process.env.PORT ? Number(process.env.PORT) : 3003;
data_source_1.AppDataSource.initialize().then(() => {
    app.use("/api", (0, post_route_1.initPostRoutes)(data_source_1.AppDataSource));
    app.listen(PORT, () => {
        console.log(`Post service running on port ${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api/docs`);
    });
}).catch((error) => {
    console.error("Error connecting to the database:", error);
});

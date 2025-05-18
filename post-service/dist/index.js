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
const data_source_1 = require("./data-source/data-source");
const post_route_1 = require("./routes/post.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, "docs", "swagger.yaml"));
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
data_source_1.AppDataSource.initialize().then(() => {
    app.use("/api", (0, post_route_1.initPostRoutes)(data_source_1.AppDataSource));
    app.listen(3003, () => {
        console.log("Post service running on port 3003");
    });
});

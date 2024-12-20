"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const carsRoutes_1 = __importDefault(require("./routes/carsRoutes"));
const app = (0, express_1.default)();
exports.app = app;
dotenv_1.default.config();
const port = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/cars", carsRoutes_1.default);
// start the server
if (process.env.NODE_ENV !== "test") {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}

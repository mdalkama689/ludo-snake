"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./routes/user-route"));
const cors_1 = __importDefault(require("cors"));
const ws_1 = require("ws");
const socket_1 = __importDefault(require("./socket/socket"));
const CLIENT_URL = process.env.CLIENT_URL;
const corsOptions = {
    origin: CLIENT_URL,
    credentials: true,
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use("/", user_route_1.default);
const httpServer = app.listen(3000, () => {
    console.log("running");
});
const wss = new ws_1.WebSocketServer({ server: httpServer });
wss.on('connection', (ws, req) => {
    console.log('new user connected');
    (0, socket_1.default)(ws, req);
});

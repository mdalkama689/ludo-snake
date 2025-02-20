"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const startWebSocket = (server) => {
    const wss = new ws_1.WebSocketServer({ server });
    console.log('start socke');
    wss.on('connection', (ws) => {
        console.log('new user conncted');
    });
};
exports.default = startWebSocket;

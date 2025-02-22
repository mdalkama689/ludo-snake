"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const url_1 = __importDefault(require("url"));
const rooms = new Map();
const socketHandler = (ws, req) => __awaiter(void 0, void 0, void 0, function* () {
    const paramsUrl = url_1.default.parse(req.url, true).query;
    const token = paramsUrl.token;
    const isValid = yield verifyToken(token);
    if (!isValid) {
        ws.close();
    }
    ws.on("message", (data) => {
        const parsedData = JSON.parse(data);
        if (parsedData.type === "host") {
            console.log("host");
            const currentRoomId = parsedData.roomId;
            if (!rooms.has(currentRoomId)) {
                rooms.set(currentRoomId, {
                    host: parsedData.host,
                    players: { player1: parsedData.host, player2: "" },
                    sockets: { player1: ws, player2: "" },
                });
            }
        }
        if (parsedData.type === "player") {
            const currentRoomId = parsedData.roomId;
            const room = rooms.get(currentRoomId);
            if (!room.players.player2) {
                room.players.player2 = parsedData.username;
                room.sockets.player2 = ws;
            }
            const data = {
                type: 'connected',
                message: 'Both are connected start the game!',
                players: [room.players.player1, room.players.player2],
                currentTurnPlayer: room.host
            };
            room.sockets.player1.send(JSON.stringify((data)));
            room.sockets.player2.send(JSON.stringify((data)));
        }
        if (parsedData.type === 'turn') {
            console.log(parsedData);
            const roomId = parsedData.roomId;
            const room = rooms.get(roomId);
            room.sockets.player1.send(JSON.stringify(parsedData));
            room.sockets.player2.send(JSON.stringify(parsedData));
        }
    });
});
exports.default = socketHandler;
const secret = process.env.JWT_SECRET || "secret";
function verifyToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const decodeToken = yield jsonwebtoken_1.default.verify(token, secret);
        if (!decodeToken)
            return false;
        return true;
    });
}

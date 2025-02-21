"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let users = [];
const socketHandler = (socket) => {
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message.toString());
        console.log(parsedMessage);
        if (parsedMessage.type === "host") {
            const messageValue = {
                type: "wait",
                message: "Please wait until another player will come",
            };
            socket.send(JSON.stringify(messageValue));
            users.push({
                socket,
                roomId: parsedMessage.roomId,
                username: parsedMessage.username,
                host: true,
            });
        }
        if (parsedMessage.type === "player") {
            const roomPlayerCount = users.filter((user) => user.roomId == parsedMessage.roomId);
            if (roomPlayerCount.length == 2) {
                const messageValue = {
                    type: "limit",
                    message: "you cannot allowed max limit reached",
                };
                return socket.send(JSON.stringify(messageValue));
            }
            users.push({
                socket,
                roomId: parsedMessage.roomId,
                username: parsedMessage.username,
                host: false,
            });
            const playersInRoom = users.filter((user) => user.roomId == parsedMessage.roomId);
            const messageValue = {
                type: "connected",
                message: "both are connected, start the game ",
            };
            const p1 = playersInRoom[0].username;
            const p2 = playersInRoom[1].username;
            const bothPlayer = {
                type: "player",
                players: [p1, p2],
            };
            let turn;
            playersInRoom.map((user) => {
                if (user.host) {
                    turn = {
                        type: "turn",
                        currentTurn: user.username,
                    };
                }
                user.socket.send(JSON.stringify(messageValue));
                user.socket.send(JSON.stringify(turn));
                user.socket.send(JSON.stringify(bothPlayer));
            });
        }
    });
    socket.on("close", () => {
        console.log("user disconnected");
        users = users.filter((user) => user.socket != socket);
    });
    console.log(users.length);
};
exports.default = socketHandler;

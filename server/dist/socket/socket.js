"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let users = [];
const socketHandler = (socket) => {
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message.toString());
        console.log(message);
        if (parsedMessage.type === "host") {
            socket.send("Please wait unitl another player will come");
        }
    });
};
exports.default = socketHandler;

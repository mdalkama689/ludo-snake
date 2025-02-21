let users: any = [];

const socketHandler = (socket: any) => {
  socket.on("message", (message: any) => {
    const parsedMessage: IParsedMessage = JSON.parse(message.toString());
    console.log(parsedMessage);

    if (parsedMessage.type === "host") {
      const messageValue: IMessage = {
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
      const roomPlayerCount = users.filter(
        (user: any) => user.roomId == parsedMessage.roomId
      );

      if (roomPlayerCount.length == 2) {
        const messageValue: IMessage = {
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

      const playersInRoom = users.filter(
        (user: any) => user.roomId == parsedMessage.roomId
      );

      const messageValue: IMessage = {
        type: "connected",
        message: "both are connected, start the game ",
      };

   
      const p1 = playersInRoom[0].username;
      const p2 = playersInRoom[1].username;

      const bothPlayer = {
        type: "player",
        players: [p1, p2],
      };

      let turn: IMessage;

      playersInRoom.map((user: any) => {
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
    users = users.filter((user: any) => user.socket != socket);
  });

  console.log(users.length);
};

export default socketHandler;

interface IParsedMessage {
  type: string;
  roomId: string;
  username: string;
  currentTurn?: string;
}

interface IMessage {
  type: string;
  message?: string;
  currentTurn?: string;
  host?: any;
}

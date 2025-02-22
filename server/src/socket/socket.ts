import { checkPrime } from "crypto";
import jwt from "jsonwebtoken";
import { parse } from "path";

import url from "url";

const rooms = new Map();

const socketHandler = async (ws: any, req: any) => {
  const paramsUrl = url.parse(req.url, true).query;
  const token = paramsUrl.token;

  const isValid = await verifyToken(token);
  if (!isValid) {
    ws.close();
  }

  ws.on("message", (data: any) => {
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
    players:[room.players.player1, room.players.player2],
    currentTurnPlayer: room.host 
      }

      room.sockets.player1.send(JSON.stringify((data)))
      room.sockets.player2.send(JSON.stringify((data)))
    }

    if(parsedData.type === 'turn'){
        console.log(parsedData)
        const roomId = parsedData.roomId
        const room = rooms.get(roomId)

        room.sockets.player1.send(JSON.stringify(parsedData))
        room.sockets.player2.send(JSON.stringify(parsedData))
    }
  });
};

export default socketHandler;

const secret = process.env.JWT_SECRET || "secret";
async function verifyToken(token: any) {
  const decodeToken = await jwt.verify(token, secret);
  if (!decodeToken) return false;

  return true;
}

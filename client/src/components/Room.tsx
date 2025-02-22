import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { token } from "../config";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import Dice from "./Dice";
import Canvas from "./Canvas";

const Room = () => {
  const { roomId } = useParams();
  const wsRef = useRef<WebSocket | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<string>("");
  const [bothPlayer, setBothPlayer] = useState([]);

  

  const { state: message } = useLocation();
  const auth = useContext(AuthContext);
  if (!auth) return;
  const { username } = auth;

  const navigate = useNavigate();

  useEffect(() => {
    if (!message) {
      navigate("/");
    }
  }),
    [];

  useEffect(() => {
    if (wsRef.current) return;

    const ws = new WebSocket(`ws://localhost:3000?token=${token}`);
    wsRef.current = ws;

    ws.onopen = () => {
      const data =
        message.type === "host"
          ? {
              type: "host",
              roomId,
              host: username,
            }
          : { type: "player", roomId, username };

      ws.send(JSON.stringify(data));
    };

    ws.onmessage = (data) => {
      const parsedData = JSON.parse(data.data);

      if (parsedData.type === "connected") {
        toast.success(parsedData.message);
        setBothPlayer(parsedData.players);
        setCurrentPlayer(parsedData.currentTurnPlayer);
      }

      if (parsedData.type === "turn") {
        console.log(parsedData);
        setCurrentPlayer(parsedData.currentTurnPlayer);
      }
    };
    ws.onclose = () => {
      console.log("WebSocket closed. ");
      wsRef.current = null;
    };
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  return (
    <div className="bg-black h-screen text-white flex items-center justify-center gap-4">
      <p className="absolute top-0 left-1/2 text-white">currentPlayer -------- {currentPlayer}</p>
      <Dice
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        bothPlayer={bothPlayer}
        username={username}
        roomId={roomId}
        wsRef={wsRef}
      />

      <div>
        <Canvas />
      </div>
    </div>
  );
};

export default Room;

import { useContext, useEffect, useRef, useState } from "react";
import { data, useLocation, useNavigate, useParams } from "react-router-dom";
import { token } from "../config";
import { toast } from "react-toastify";
import Dice from "./Dice";
import { AuthContext } from "../context/AuthContext";
import IconsBar from "./IconsBar";

const Room = () => {
  const { roomId } = useParams();
  const wsRef = useRef<WebSocket | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [bothPlayer, setBothPlayer] = useState([]);

  const { state: message } = useLocation();
  const auth = useContext(AuthContext);
  if (!auth) return;
  const { username, playerOne, setPlayerOne, playerTwo, setPlayerTwo } = auth;

  const navigate = useNavigate();
  if (!message) {
    navigate("/");
  }
  useEffect(() => {
    if (wsRef.current) return;
    const ws = new WebSocket(`ws://localhost:3000?token=${token}`);
    wsRef.current = ws;
    const data = { ...message, username };

    ws.onopen = () => {
      ws.send(JSON.stringify(data));
    };

    ws.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);
      if (parsedMessage.type == "wait") {
        toast.info(parsedMessage.message);
      }
      if (parsedMessage.type == "connected") {
        toast.info(parsedMessage.message);
      }
      if (parsedMessage.type == "limit") {
        toast.error(parsedMessage.message);
        navigate("/");
      }
      if (parsedMessage.type == "turn") {
        setCurrentPlayer(parsedMessage.currentTurn);
        console.log(parsedMessage);
      }

      if (parsedMessage.type == "player") {
        console.log(parsedMessage);
        setBothPlayer(parsedMessage.players);
      }
    };

    ws.onclose = () => {
      console.log("user disconnected");
      toast.info("socket disconnected");
      wsRef.current = null;
    };

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

const handleClick = () => {
  const randomNum = Math.floor(Math.random() * 7)

  toast.success(randomNum)
  if(currentPlayer == bothPlayer[0]){
    setBothPlayer(bothPlayer[1])
  }else{
    setBothPlayer(bothPlayer[0])
  }
}

  return (
    <div className="bg-black h-screen text-white flex items-center justify-center gap-4">
      <p>current player ----- {currentPlayer}</p>
      <button onClick={handleClick} disabled={currentPlayer != username} >
        {" "}
        click here{" "}
      </button>
      {/* <div className="absolute top-4 right-4 flex flex-col items-end gap-2 p-4 bg-gray-100 rounded-lg shadow-md">
        {bothPlayer.length === 0 ? (
          <p className="text-lg font-semibold text-gray-800 bg-white px-4 py-2 rounded-md shadow">
            {username}
          </p>
        ) : (
        bothPlayer &&   bothPlayer.map((player) => (
            <p
              key={player}
              className="text-lg font-semibold text-gray-800 bg-white px-4 py-2 rounded-md shadow"
            >
              {player}
            </p>
          ))
        )}
      </div> */}
    </div>
  );
};

export default Room;

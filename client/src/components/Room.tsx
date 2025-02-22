import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { token } from "../config";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";

const allDice = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

const Room = () => {
  const { roomId } = useParams();
  const wsRef = useRef<WebSocket | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [bothPlayer, setBothPlayer] = useState([]);
  const [currentValue, setCurrentValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

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
      }

      if (parsedMessage.type == "player") {
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

  const handleDice = () => {
    if (isRolling) return;
    setIsRolling(true);

    let roll = 0;
    const maxRoll = 10;

    const interval = setInterval(() => {
      setCurrentValue(Math.floor(Math.random() * 6 + 1));
      roll++;

      if (roll > maxRoll) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 100);

    if (currentPlayer == bothPlayer[0]) {
      setCurrentPlayer(bothPlayer[1]);

      const message = {
        type: "turn",
        currentTurn: bothPlayer[1],
        roomId,
      };

      wsRef.current?.send(JSON.stringify(message));
    } else {
      setCurrentPlayer(bothPlayer[0]);
      const message = {
        type: "turn",
        currentTurn: bothPlayer[0],
        roomId,
      };

      wsRef.current?.send(JSON.stringify(message));
    }
  };

  const DiceIcon = allDice[currentValue - 1];
  return (
    <div className="bg-black h-screen text-white flex items-center justify-center gap-4">
      <div className="absolute right-3 top-3">
        <button
          className={`  p-2 bg-white rounded-2xl shadow-lg
      hover:shadow-xl transition-all duration-300  `}
          onClick={handleDice}
          disabled={currentPlayer != username}
        >
          <DiceIcon
            className={`text-indigo-400 w-20 h-20 ${
              isRolling ? "animate-spin" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default Room;

import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";
import React, { useState } from "react";

const allDice = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

interface IDice {
  currentPlayer: string;
  setCurrentPlayer: (player: string) => void;
  bothPlayer: string[];
  roomId: any;
  username: string;
  wsRef: React.MutableRefObject<WebSocket | null>;
}
const Dice = ({
  currentPlayer,
  setCurrentPlayer,
  bothPlayer,
  roomId,
  username,
  wsRef,
}: IDice) => {
  const [currentValue, setCurrentValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  const [playersPosition, setPlayersPositions] = useState({
    player1: {x: 40, y: 500,name: 'player1'},
    player2: {x: 40, y: 500, name: 'player2'}
  })
  

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

        const nextPlayer =
          currentPlayer == bothPlayer[0] ? bothPlayer[1] : bothPlayer[0];
       
        setCurrentPlayer(nextPlayer);
        const data = {
          type: "turn",
          currentTurnPlayer: nextPlayer,
          roomId,
        };
        wsRef.current?.send(JSON.stringify(data));
      }
    }, 100);
  };

  const DiceIcon = allDice[currentValue - 1];

  return (
    <div className="absolute left-3 top-3">
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
  );
};

export default Dice;

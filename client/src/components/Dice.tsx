import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const allDice = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

const Dice = ({disabled}: {disabled: boolean}) => {

  const [currentValue, setCurrentValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const auth = useContext(AuthContext);
  if (!auth) return;
  
  const { username, playerOne, setPlayerOne, playerTwo, setPlayerTwo } = auth;

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
  };

  const DiceIcon = allDice[currentValue - 1];

  console.log(currentValue);
  return (
    <button
      className={`  p-2 bg-white rounded-2xl shadow-lg
      hover:shadow-xl transition-all duration-300  `}
      onClick={handleDice}
disabled={!disabled}
    >
      <DiceIcon
      
        className={`text-indigo-400 w-20 h-20 ${
          isRolling ? "animate-spin" : ""
        }`}
      />
    </button>
  );
};

export default Dice;

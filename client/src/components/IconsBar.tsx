import { useState } from "react";

const IconsBar = () => {
  const [currentPlayer, setCurrentPlayer] = useState("A");
  const [value, setValue] = useState(1);

  const rollDice = () => {
    const num = Math.floor(Math.random() * 10);
    setValue(num);
    setCurrentPlayer((pre) => (pre == "A" ? "B" : "A"));
  };
  return (
    <div>
      <p>current user {currentPlayer}</p>
      <p>currnt value {value}</p>
      <div className="flex items-center justify-center gap-3">
        <button onClick={rollDice} disabled={currentPlayer != "A"}>
          User A{" "}
        </button>
        <button onClick={rollDice} disabled={currentPlayer != "B"}>
          User A{" "}
        </button>
      </div>
    </div>
  );
};

export default IconsBar;

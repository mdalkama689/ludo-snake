import { useEffect, useRef, useState } from "react";
import { Game } from "../draw/Game";
import { FaChessPawn } from "react-icons/fa";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState(null);
  const [move, setMove] = useState(1);

  const handleMove = () => {
    setMove(move + 1);
  };

  useEffect(() => {
    if (!game) return;
    game.setValue();
  }, [move, game]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const g = new Game(canvasRef.current);
    setGame(g);

    return () => {};
  }, []);

  return (
    <div>
      <div className="ml-36 mt-11">
        <canvas
          className="border border-black"
          ref={canvasRef}
          height={500}
          width={500}
        ></canvas>
      </div>
      <div className="border border-red-800 w-fit mt-[-39px]  flex gap-0">
        <FaChessPawn color="red" size={30} />
        <FaChessPawn color="blue" size={30} />
        <FaChessPawn color="green" size={30} />
        <FaChessPawn color="black" size={30} />
      </div>
      <button onClick={handleMove}>Move </button>
    </div>
  );
};

export default Canvas;

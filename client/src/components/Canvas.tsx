import { useEffect, useRef, useState } from "react";
import { Game } from "../draw/Game";
import Icon from "./Icon";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);



  useEffect(() => {
    if (!canvasRef.current) return;

    const g = new Game(canvasRef.current);

    return () => {};
  }, []);

  return (
    <div className="relative ml-36 mt-11 ">
      <canvas
        className="border border-red-900"
        ref={canvasRef}
        height={500}
        width={500}
      ></canvas>

      <div className="absolute bottom-0 left-0 flex ">
        <Icon color="red"  />
        <Icon color="blue"   />
      </div>
    </div>
  );
};

export default Canvas;

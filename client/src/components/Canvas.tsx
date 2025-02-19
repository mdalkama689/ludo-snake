import { useEffect, useRef } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    let size = 50;
    const ctx = canvas.getContext("2d");
    canvas.addEventListener("mousedown", (e) => {
      const rect = canvas.getBoundingClientRect();

      console.log("X : ", e.clientX - rect.left);
      console.log("y: ", e.clientY - rect.top);
    });
    let leftStart = true;
    let x = 0;
    let y = canvas.height - 50;

    let count = 1;
    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 10; col++) {
        if (leftStart) {
          col % 2 == 0
            ? (ctx.fillStyle = "#1E1E1E")
            : (ctx.fillStyle = "#00FF00");
          ctx.fillRect(x, y, size, size);
          ctx.font = "20px Arial";
          ctx.fillStyle = "white";
          ctx.fillText(count, x + 15, y + 30);

          x = x + 50;
        } else {
          x = x - 50;
          col % 2 == 0
            ? (ctx.fillStyle = "#1E1E1E")
            : (ctx.fillStyle = "#00FF00");
          ctx.fillRect(x, y, size, size);
          ctx.font = "20px Arial";
          ctx.fillStyle = "white";
          ctx.fillText(count, x + 15, y + 30);
        }

        if (col == 10 && leftStart) {
          x = 500;
        }
        if (col == 10 && !leftStart) {
          x = 0;
        }
        if (col == 10) {
          leftStart = !leftStart;
          y = y - size;
        }
        count++;
      }
    }


    return () => {};
  }, []);

  return (
    <div className="ml-8 mt-11">
      <canvas
        className="border border-black"
        ref={canvasRef}
        height={500}
        width={500}
      ></canvas>
    </div>
  );
};

export default Canvas;

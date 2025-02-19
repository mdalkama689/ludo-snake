export class Game {
  private readonly size: number = 50;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    this.ctx = ctx;
    this.init();
    this.canvas.addEventListener("mousedown", this.handleMouseDown);
  }

  init = () => {
    let leftStart = true;
    let x = 0;
    let y = this.canvas.height - this.size;
    let count = 1;

    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 10; col++) {
        if (leftStart) {
          col % 2 == 0
            ? (this.ctx.fillStyle = "#1E1E1E")
            : (this.ctx.fillStyle = "#00FF00");
          this.ctx.fillRect(x, y, this.size, this.size);
          this.ctx.font = "20px Arial";
          this.ctx.fillStyle = "white";
          this.ctx.fillText(count, x + 15, y + 30);

          x = x + 50;
        } else {
          x = x - 50;
          col % 2 == 0
            ? (this.ctx.fillStyle = "#1E1E1E")
            : (this.ctx.fillStyle = "#00FF00");
          this.ctx.fillRect(x, y, this.size, this.size);
          this.ctx.font = "20px Arial";
          this.ctx.fillStyle = "white";
          this.ctx.fillText(count, x + 15, y + 30);
        }
        // want to start from right
        if (col == 10 && leftStart) {
          x = 500;
        }
        // want to start from left
        if (col == 10 && !leftStart) {
          x = 0;
        }
        if (col == 10) {
          leftStart = !leftStart;
          y = y - this.size;
        }
        count++;
      }
    }
  };

  setValue = () => {
    
  };

  handleMouseDown = (e: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    console.log(x, y);
  };

 
}

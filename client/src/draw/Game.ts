import boardImage from "../assets/nw.png";

export class Game {
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
    console.log(boardImage);
    const img = new Image();
    img.src = boardImage;
    img.onload = () => {
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    };
  };
  setValue = () => {};

  handleMouseDown = (e: any) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log(x, y);
  };
}

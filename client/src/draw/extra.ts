
// init = () => {
//     let leftStart = true;
//     let x = 0;
//     let y = this.canvas.height - this.size;
//     let count = 1;

//     for (let row = 1; row <= 10; row++) {
//       for (let col = 1; col <= 10; col++) {
//         if (leftStart) {
//           col % 2 == 0
//             ? (this.ctx.fillStyle = "#1E1E1E")
//             : (this.ctx.fillStyle = "#00FF00");
//           this.ctx.fillRect(x, y, this.size, this.size);
//           this.ctx.font = "20px Arial";
//           this.ctx.fillStyle = "white";
//           this.ctx.fillText(count, x + 15, y + 30);

//           x = x + 50;
//         } else {
//           x = x - 50;
//           col % 2 == 0
//             ? (this.ctx.fillStyle = "#1E1E1E")
//             : (this.ctx.fillStyle = "#00FF00");
//           this.ctx.fillRect(x, y, this.size, this.size);
//           this.ctx.font = "20px Arial";
//           this.ctx.fillStyle = "white";
//           this.ctx.fillText(count, x + 15, y + 30);
//         }
//         // want to start from right
//         if (col == 10 && leftStart) {
//           x = 500;
//         }
//         // want to start from left
//         if (col == 10 && !leftStart) {
//           x = 0;
//         }
//         if (col == 10) {
//           leftStart = !leftStart;
//           y = y - this.size;
//         }
//         count++;
//       }
//     }
//   };


const obj = {
  roomId: 12,
  players: [
    {player1: 'aman'},
    {player2: 'peyush'}
  ],
  
  hostname: 'aman'
}
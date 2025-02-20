
let users: any = []

const socketHandler = (socket: any) => {

  socket.on("message", (message: any) => {
    const parsedMessage: IParsedMessage = JSON.parse(message.toString());
    console.log(message);

    if (parsedMessage.type === "host") {
      socket.send("Please wait unitl another player will come");
    }
    if(parsedMessage.type === 'player'){
      
    }
  });
};

export default socketHandler;

interface IParsedMessage {
  type: string;
  roomId: string;
}

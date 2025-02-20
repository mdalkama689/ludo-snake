import express from "express";
import userRoutes from "./routes/user-route";
import cors from "cors";
import { WebSocketServer } from "ws";
import socketHandler from "./socket/socket";



const CLIENT_URL = process.env.CLIENT_URL;
const corsOptions = {
  origin: CLIENT_URL,
  credentials: true,
};
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/", userRoutes);

const httpServer = app.listen(3000, () => {
  console.log("running");
});

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (ws) => {
console.log('new user connected')
ws.send('thanks for connectig')
socketHandler(ws)
ws.on('close', () => {
  console.log('user disconnected')
})
})
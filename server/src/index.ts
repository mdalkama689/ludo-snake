import express from "express";
const app = express();
import userRoutes from "./routes/user-route";
import cors from "cors";

const CLIENT_URL = process.env.CLIENT_URL 
const corsOptions = {
  origin: CLIENT_URL,
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/", userRoutes);

app.listen(3000, () => {
  console.log("running");
});

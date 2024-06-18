import express from "express";
import cors from "cors";
import http from "http";
import connectDB from "./config/connect.js";

import { handleSocketConnection } from "./controllers/socketController.js";

import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";

const app = express();
const PORT = process.env.PORT || 8100;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);

const server = http.createServer(app);

handleSocketConnection(server);

server.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});

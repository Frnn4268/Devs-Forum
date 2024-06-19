import express from "express";
import cors from "cors";
import http from "http";
import connectDB from "./config/connect.js";

import { handleSocketConnection } from "./controllers/socketController.js";

import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";

const app = express(); // Initialize express app
const PORT = process.env.PORT || 8100; // Set the port

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(
  cors({
    origin: "http://localhost:3000", // Allow CORS from this origin
    credentials: true,
  })
);

app.use("/api/users", userRoutes); // Route for user-related operations
app.use("/api/questions", questionRoutes); // Route for question-related operations

const server = http.createServer(app); // Create an HTTP server

handleSocketConnection(server); // Initialize socket.io for real-time communication

server.listen(PORT, () => {
  connectDB(); // Connect to the database
  console.log(`Server running on port ${PORT}`); // Log server start
});

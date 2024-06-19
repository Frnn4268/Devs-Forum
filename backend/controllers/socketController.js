import { Server } from "socket.io";

// Function to handle socket connections
const handleSocketConnection = (server) => {
  // Initialize the socket.io server
  const io = new Server(server, {
    secure: true,
    cors: {
      origin: "http://localhost:3000", // Allow connections from this origin
      methods: ["GET", "POST"], // Allowed HTTP methods
      credentials: true, // Allow credentials such as cookies and authorization headers
    },
  });

  // Event listener for a new socket connection
  io.on("connection", (socket) => {
    console.log("socket connected");
    const users = [];

    // Collect connected users' data
    for (let [id, socket] of io.of("/").sockets) {
      if (socket.handshake.auth._id)
        users.push({
          ...socket.handshake.auth,
          socketId: socket.handshake.auth._id,
        });
    }

    console.log("users", users);
    io.emit("user-connected", users); // Notify all clients about the connected users

    // Event listener for joining a room
    socket.on("join-room", ({ room, user }) => {
      users[user._id] = user;
      socket.join(room); // Join the specified room
    });

    // Event listener for sending a message
    socket.on("send-message", ({ message, room, user }) => {
      console.log("message", message, room, user);
      io.to(room).emit("receive-message", { message, user, room }); // Emit the message to the room
    });

    // Event listener for socket disconnection
    socket.on("disconnect", () => {
      console.log("disconnected");
      const delUser = users.filter(
        (user) => user.socketId !== socket.handshake.auth._id
      );
      console.log("disconnected users", delUser);
      io.emit("user-disconnected", delUser); // Notify all clients about the disconnected users
    });
  });
};

export { handleSocketConnection };

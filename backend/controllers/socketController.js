import { Server } from "socket.io";

const handleSocketConnection = (server) => {
  const io = new Server(server, {
    secure: true,
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("socket connected");
    const users = [];

    for (let [id, socket] of io.of("/").sockets) {
      if (socket.handshake.auth._id)
        users.push({
          ...socket.handshake.auth,
          socketId: socket.handshake.auth._id,
        });
    }

    console.log("users", users);
    io.emit("user-connected", users);

    socket.on("join-room", ({ room, user }) => {
      users[user._id] = user;
      socket.join(room);
    });

    socket.on("send-message", ({ message, room, user }) => {
      console.log("message", message, room, user);
      io.to(room).emit("receive-message", { message, user, room });
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
      const delUser = users.filter(
        (user) => user.socketId !== socket.handshake.auth._id
      );
      console.log("disconnected users", delUser);
      io.emit("user-disconnected", delUser);
    });
  });
};

export { handleSocketConnection };

import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
  console.log("New client connected.");

  socket.on("message", (message) => {
    console.log("Received message:", message.toString());

    let parsedMessage;
    try {
      parsedMessage = JSON.parse(message.toString());
    } catch (error) {
      console.error("Invalid JSON format received.");
      return;
    }

    if (parsedMessage.type === "join") {
      console.log("User joined room:", parsedMessage.payload.roomId);
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
      // Calculate active users in the room and broadcast the count.
      const roomId = parsedMessage.payload.roomId;
      const activeUsers = allSockets.filter((user) => user.room === roomId).length;
      allSockets.forEach((user) => {
        if (user.room === roomId && user.socket.readyState === WebSocket.OPEN) {
          user.socket.send(JSON.stringify({
            type: "userCount",
            payload: { activeUsers }
          }));
        }
      });
    }

    if (parsedMessage.type === "chat") {
      console.log("User wants to chat");

      let currentUserRoom = allSockets.find(user => user.socket === socket)?.room;
      if (!currentUserRoom) return;

      for (let user of allSockets) {
        if (user.room === currentUserRoom && user.socket.readyState === WebSocket.OPEN) {
          user.socket.send(JSON.stringify({
            text: parsedMessage.payload.message,
            color: parsedMessage.payload.color,
          }));
        }
      }
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected.");
    // Find the user's room before removing them.
    const user = allSockets.find((user) => user.socket === socket);
    if (user) {
      const roomId = user.room;
      allSockets = allSockets.filter((user) => user.socket !== socket);
      // Update active user count in the room.
      const activeUsers = allSockets.filter((user) => user.room === roomId).length;
      allSockets.forEach((user) => {
        if (user.room === roomId && user.socket.readyState === WebSocket.OPEN) {
          user.socket.send(JSON.stringify({
            type: "userCount",
            payload: { activeUsers }
          }));
        }
      });
    }
  });
});

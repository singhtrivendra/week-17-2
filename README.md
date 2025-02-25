<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Full-Stack Chat App</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
        code { background: #f4f4f4; padding: 3px 6px; border-radius: 4px; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
        h1, h2 { color: #333; }
    </style>
</head>
<body>

    <h1>🚀 Full-Stack Chat App</h1>
    <p>A real-time chat application where users can join a chat room using a shared room ID or create a new room, invite friends, and start chatting.</p>

    <h2>✨ Features</h2>
    <ul>
        <li>✅ Create & join chat rooms</li>
        <li>✅ Real-time messaging using WebSockets</li>
        <li>✅ TypeScript-based backend</li>
        <li>✅ Modern frontend with Vite + React</li>
        <li>✅ Responsive UI with Tailwind CSS</li>
    </ul>

    <h2>🚀 Backend Setup (Node.js + TypeScript + WebSockets)</h2>

    <h3>1️⃣ Initialize the Project</h3>
    <pre><code>npm init -y</code></pre>

    <h3>2️⃣ Install TypeScript & Configure</h3>
    <pre><code>npm install typescript
npx tsc --init</code></pre>

    <h3>3️⃣ Set Up TypeScript Configuration (`tsconfig.json`)</h3>
    <pre><code>{
  "rootDir": "./src",
  "outDir": "./dist"
}</code></pre>

    <h3>4️⃣ Install Dependencies</h3>
    <pre><code>npm install express @types/express
npm install ws @types/ws</code></pre>

    <h3>5️⃣ Create <code>server.ts</code></h3>
    <pre><code>import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const server = app.listen(3000, () => console.log("Server running on port 3000"));
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    wss.clients.forEach(client => client.send(message.toString()));
  });

  ws.on("close", () => console.log("Client disconnected"));
});
</code></pre>

    <h3>6️⃣ Start the Backend</h3>
    <pre><code>npx tsc
node dist/server.js</code></pre>

    <h2>🎨 Frontend Setup (Vite + React + WebSockets)</h2>

    <h3>1️⃣ Create a Vite App</h3>
    <pre><code>npm create vite@latest my-chat-app --template react
cd my-chat-app
npm install</code></pre>

    <h3>2️⃣ Install WebSocket & Dependencies</h3>
    <pre><code>npm install react-use-websocket</code></pre>

    <h3>3️⃣ Implement WebSocket Client (<code>App.tsx</code>)</h3>
    <pre><code>import React, { useState } from "react";
import useWebSocket from "react-use-websocket";

const WS_URL = "ws://localhost:3000";

export default function App() {
  const { sendMessage, lastMessage } = useWebSocket(WS_URL);
  const [message, setMessage] = useState("");

  return (
    <div className="p-5">
      <h1 className="text-2xl">Chat App</h1>
      <input
        className="border p-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => sendMessage(message)} className="ml-2 bg-blue-500 p-2 text-white">
        Send
      </button>
      <p>Last message: {lastMessage?.data}</p>
    </div>
  );
}
</code></pre>

    <h3>4️⃣ Start the Frontend</h3>
    <pre><code>npm run dev</code></pre>

    <h2>📌 Conclusion</h2>
    <p>This is a basic <strong>full-stack chat application</strong> built with <strong>Node.js, TypeScript, WebSockets</strong>, and <strong>Vite (React)</strong>. Future improvements can include authentication, UI enhancements, and a database to store messages.</p>

    <h2>📜 License</h2>
    <p>MIT License - Feel free to use and modify.</p>

</body>
</html>

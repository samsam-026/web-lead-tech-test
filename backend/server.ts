import express, {Request, Response, NextFunction, Router} from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

import messagesRoute from './src/routes/message.route'; 
import { Message } from "./src/models/message";


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use('/api/messages', messagesRoute);

io.on('connection', (socket) => {
  socket.on('start_chat', (participants: number[]) => {
    socket.join(`room_${participants.join('_')}`);
  });

  socket.on('end_chat', (participants: number[]) => {
    socket.leave(`room_${participants.join('_')}`);
  });

  socket.on('send_message', (participants: number[], message: Message) => {
    socket.broadcast.to(`room_${participants.join('_')}`).emit('receive_message', message);
  });
});

// Start the server on port 3001
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

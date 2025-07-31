import express, {Request, Response, NextFunction, Router} from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";

import messagesRoute from './src/routes/message.route'; 


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());





app.use('/api/messages', messagesRoute);


// Start the server on port 3001
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

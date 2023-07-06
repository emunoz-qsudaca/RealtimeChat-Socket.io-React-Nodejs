import express from "express";
import { Socket, Server as SocketServer } from "socket.io";
import http from "http";
import config from "./config";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket: Socket) => {
  socket.on("message", (body) => {
    socket.emit(body);

    socket.broadcast.emit("message", {
      message: body.message,
      author: body.author,
    });
  });
});

server.listen(config.PORT);

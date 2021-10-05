import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { Application } from "express";
import session from "express-session";
import http from "http";
import logger from "morgan";
import path from "path";
import { Server } from "socket.io";
import connectDB from "./config/db";
import { authRouter } from "./lib/auth";
import { messageRouter, roomRouter } from "./lib/chat";

dotenv.config();

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server);
let port = process.env.PORT || 8000;

app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIES_SECRET));
app.use(express.static(path.join(__dirname, "../public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: "sessions",
    }),
  })
);


io.on("connection", (socket) => {
  console.log("user connected ", socket.id);
  socket.on("join room", (roomId) => {
    console.log("user joined room ", roomId);
    socket.join(roomId);
  });

  socket.on("leave room", (roomId) => {
    console.log("user leaved room ", roomId);
    socket.leave(roomId);
  });

  socket.on("room added", (room) => {
    console.log("room added");
    socket.emit(room);
  });

  socket.on("message", (data) => {
    console.log("messages received");
    io.to(data?.room).emit("message", data?.message);
  });
});

app.get("/", (req: any, res: any) => {
  res.send("Welcome");
});

app.use("/api/auth/", authRouter);
app.use("/api/messages/", messageRouter);
app.use("/api/rooms/", roomRouter);

connectDB(() => {
  server.listen(port);
  console.info("Listening on http://localhost:" + port);
});

export default app;

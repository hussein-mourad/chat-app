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
import { userRouter } from "./lib/user";

dotenv.config();

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server);
let port = process.env.PORT || 3000;

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
  socket.on("join room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("leave room", (roomId) => {
    socket.leave(roomId);
  });

  socket.on("room added", (room) => {
    socket.emit(room);
  });

  socket.on("message", (data) => {
    io.to(data?.room).emit("message", data?.message);
  });
});

app.get("/", (req: any, res: any) => {
  res.json({ status: "running" });
});

app.use("/api/auth/", authRouter);
app.use("/api/messages/", messageRouter);
app.use("/api/rooms/", roomRouter);
app.use("/api/user", userRouter);

connectDB(() => {
  server.listen(port);
  console.info("Listening on http://localhost:" + port);
});

export default app;

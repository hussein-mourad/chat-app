import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import session from "express-session";
import fs from "fs";
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
    socket.emit("room added", room);
  });

  socket.on("message", (data) => {
    io.to(data?.room).emit("message", data?.message);
  });
});

app.get("/status", (req: Request, res: Response) => {
  res.json({ status: "running" });
});

app.use("/api/auth/", authRouter);
app.use("/api/messages/", messageRouter);
app.use("/api/rooms/", roomRouter);
app.use("/api/user", userRouter);

app.get("*", (req: Request, res: Response, next: NextFunction) => {
  let fileName: string = req.originalUrl;
  console.log("🚀 ~ file: server.ts ~ line 72 ~ app.get ~ fileName", fileName);
  if (fileName.charAt(fileName.length - 1) == "/") {
    fileName = fileName.slice(0, -1);
  }
  const filePath = path.join(__dirname, `../public/${fileName}.html`);
  console.log("🚀 ~ file: server.ts ~ line 76 ~ app.get ~ filePath", filePath);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.sendFile(path.join(__dirname, `../public/404.html`));
  }
});

connectDB(() => {
  server.listen(port);
  console.info("Listening on http://localhost:" + port);
});

export default app;

import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { Application } from "express";
import session from "express-session";
import logger from "morgan";
import path from "path";
import connectDB from "./config/db";
import {authRouter} from "./lib/auth";
import http from "http"
import {Server} from "socket.io"

dotenv.config();

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server); 
const port = process.env.PORT || "8000";

connectDB(() => {
  server.listen(port);
  console.info("Listening on http://localhost:" + port);
});

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


io.on("connection", (socket)=>{
  console.log(socket.id);
  socket.emit("message", "Hello and Welcome")
  socket.on("send_message", (data)=>{
    socket.emit("message", data)
  })
})

app.get("/", (req: any, res: any) => {
  res.send("Welcome");
});

app.use("/api/auth/", authRouter);

export default app;

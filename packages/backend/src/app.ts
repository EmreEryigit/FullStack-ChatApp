import express from "express";
const app = express();
import { Server, Socket } from "socket.io";
import httpServer from "http";
import helmet from "helmet";
import authRoute from "./router/authRouter";
import session from "express-session";
import dotenv from "dotenv";
import {
    corsConfig,
    sessionMiddleware,
    wrap,
} from "./controller/serverController";
import cors from "cors";
import { authorizeUser } from "./controller/socketController";

dotenv.config();
const server = httpServer.createServer(app);
const io = new Server(server, {
    cors: corsConfig,
});

app.use(helmet());
app.use(express.json());
app.use(cors(corsConfig));
app.use(sessionMiddleware);

app.use("/auth", authRoute);

io.use(wrap(sessionMiddleware));
io.use(authorizeUser)
io.on("connect", (socket: any) => {
   console.log(socket.user.userid);
   
});

server.listen(4000, () => {
    console.log("Server listening on port 4000");
});

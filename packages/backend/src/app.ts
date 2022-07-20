import express from "express"
const app = express()
import { Server } from "socket.io"
import httpServer from "http"
import helmet from "helmet"
import cors from "cors"
import authRoute from "./router/authRouter"
import session from "express-session"
import dotenv from "dotenv"
import { redisClient } from "../redis"
import Store from "connect-redis"
const RedisStore = Store(session)

dotenv.config()
const server = httpServer.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})
 

app.use(helmet())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(session({
    secret: "asdfasfkxnvbmx",
    saveUninitialized: false,
    resave: false,
    name: "sid",
    store: new RedisStore({client: redisClient}),
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000* 60* 60* 24 *7 
    }
}))

app.use("/auth",authRoute)

io.on("connect", socket => {})
server.listen(4000, () => {
    console.log("Server listening on port 4000")
})
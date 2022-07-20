import session from "express-session";
import { redisClient } from "../../redis";
import Store from "connect-redis";
import { Socket } from "socket.io";
import { NextFunction } from "express";

const RedisStore = Store(session);
export const sessionMiddleware = session({
    secret: "asdfasfkxnvbmx",
    saveUninitialized: false,
    resave: false,
    name: "sid",
    store: new RedisStore({ client: redisClient }),
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
});

export const wrap = (expressMiddleWare: any) => (socket: Socket, next: any) =>
    expressMiddleWare(socket.request, {}, next);

export const corsConfig = {
    origin: "http://localhost:3000",
    credentials: true,
};

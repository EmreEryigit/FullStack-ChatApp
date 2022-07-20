import { redisClient } from "../../redis";
import { usersKey } from "../redisKeys";

export const authorizeUser = (socket: any, next: any) => {
    if (!socket.request.session || !socket.request.session.user) {
        next(new Error("Not authorized!"));
        console.log("bad request socket controller");
    }
    socket.user = { ...socket.request.session.user };
    redisClient.hset(
        usersKey(socket.user.username),
        "userid:",
        socket.user.userid
    );
    next();
};

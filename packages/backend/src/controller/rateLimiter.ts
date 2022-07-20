import { NextFunction, Request, Response } from "express";
import { redisClient } from "../../redis";

export const rateLimiter =
    (secondsLimit: number, limitCount: number) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const ip = req.socket.remoteAddress as string;
        const response = await redisClient
            .multi()
            .incr(ip)
            .expire(ip, secondsLimit)
            .exec();
        if (response) {
            if (
                typeof response[0][1] === "number" &&
                response[0][1] > limitCount
            ) {
                res.json({
                    loggedIn: false,
                    status: "Slow down! Try again in a minute",
                });
            } else {
                next();
            }
        }
    };

import { Socket } from "socket.io";
import { redisClient } from "../../redis";
import { usersKey } from "../redisKeys";

export const authorizeUser = (socket: any, next: any) => {
    if (!socket.request.session || !socket.request.session.user) {
        next(new Error("Not authorized!"));
    } else {
        next();
    }
};

export const initializeUser = async (socket: any) => {
    socket.user = { ...socket.request.session.user };
    socket.join(socket.user.userid);
    await redisClient.hset(
        `userid:${socket.user.username}`,
        "userid",
        socket.user.userid,
        "connected",
        1 // means connected redis does not support boolean
    );
    const friendList = await redisClient.lrange(
        `friends:${socket.user.username}`,
        0,
        -1
    );
    const parsedFriendList = await parseFriendList(friendList);
    const friendRooms = parsedFriendList.map((friend) => friend.userid);
    if (friendRooms.length > 0) {
        socket.to(friendRooms).emit("connected", 1, socket.user.username);
    }

    socket.emit("friends", parsedFriendList);
    const msgQuery = await redisClient.lrange(
        `chat:${socket.user.userid}`,
        0,
        -1
    );
    const messages = msgQuery.map((msgStr: string) => {
        const parsedStr = msgStr.split(".");
        return { to: parsedStr[0], from: parsedStr[1], content: parsedStr[2] };
    });
    if (messages && messages.length > 0) {
        socket.emit("messages", messages);
    }
};

export const addFriend = async (
    socket: any,
    friendName: string,
    cb: ({
        done,
        errorMsg,
        newFriend,
    }: {
        done: boolean;
        errorMsg?: string;
        newFriend?: { [key: string]: string };
    }) => void
) => {
    if (friendName === socket.user.username) {
        cb({ done: false, errorMsg: "You cannot add yourself" });
        return;
    }
    const friend = await redisClient.hgetall(`userid:${friendName}`);

    const currentFriendList = await redisClient.lrange(
        `friends:${socket.user.username}`,
        0,
        -1
    );
    if (!friend.userid) {
        cb({ done: false, errorMsg: "User does not exist!" });
        return;
    }
    if (currentFriendList && currentFriendList.indexOf(friendName) !== -1) {
        cb({ done: false, errorMsg: "Friend already added" });
        return;
    }
    await redisClient.lpush(
        `friends:${socket.user.username}`,
        [friendName, friend.userid].join(".")
    );
    const newFriend = {
        username: friendName,
        userid: friend.userid,
        connected: friend.connected,
    };
    cb({ done: true, errorMsg: "", newFriend });
};

export const onDisconnect = async (socket: any) => {
    await redisClient.hset(`userid:${socket.user.username}`, "connected", 0);
    const friendList = await redisClient.lrange(
        `friends:${socket.user.username}`,
        0,
        -1
    );
    const friendRooms = await parseFriendList(friendList).then((friends) =>
        friends.map((friend) => friend.userid)
    );
    socket.to(friendRooms).emit("connected", 0, socket.user.username);
};

const parseFriendList = async (friendlist: any[]) => {
    const newFriendList = [];
    for (let friend of friendlist) {
        const parsedFriend = friend.split(".");
        const friendConnected = await redisClient.hget(
            `userid:${parsedFriend[0]}`,
            "connected"
        );
        newFriendList.push({
            username: parsedFriend[0],
            userid: parsedFriend[1],
            connected: friendConnected,
        });
    }
    return newFriendList;
};

export interface MessageProp {
    to: string;
    from: string;
    content: string;
}

export const dm = async (socket: any, message: MessageProp) => {
    const parsedMessage = { ...message, from: socket.user.userid };
    const messageString = [
        parsedMessage.to,
        parsedMessage.from,
        parsedMessage.content,
    ].join(".");
    await redisClient.lpush(`chat:${parsedMessage.from}`, messageString);
    await redisClient.lpush(`chat:${parsedMessage.to}`, messageString);
    socket.to(parsedMessage.to).emit("dm", parsedMessage);
};

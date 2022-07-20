import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import socket from "../../socket";
import { AccountContext } from "../AccountContext";

const useSocketSetup = (
    setFriendList: Dispatch<SetStateAction<any[]>>,
    setMessages: Dispatch<SetStateAction<any[]>>
) => {
    const ctx = useContext(AccountContext)!;
    useEffect(() => {
        socket.connect();
        socket.on("friends", (friendList) => {
            console.log(friendList);
            setFriendList(friendList);
        });
        socket.on("messages", (messages) => {
            setMessages(messages);
        });
        socket.on("dm", message => {
            setMessages(prev => [message, ...prev])
        })
        socket.on("connected", (status, username) => {
            console.log(status);
            setFriendList((prev) => {
                const friends = [...prev];
                return friends.map((friend) => {
                    if (friend.username === username) {
                        friend.connected = status;
                    }
                    return friend;
                });
            });
        });
        socket.on("connect_error", () => {
            ctx.setUser({ loggedIn: false });
        });
        return () => {
            socket.off("connect_error");
            socket.off("connected")
            socket.off("friends")
            socket.off("messages")
        };
    }, [ctx]);
};

export default useSocketSetup;

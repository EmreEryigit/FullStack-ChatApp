import { useContext, useEffect } from "react";
import socket from "../../socket";
import { AccountContext } from "../AccountContext";

const useSocketSetup = () => {
    const ctx = useContext(AccountContext)!;
    useEffect(() => {
        socket.connect();
        socket.on("connect_error", () => {
            ctx.setUser({ loggedIn: false });
        });
        return () => {
            socket.off("connect_error");
        };
    }, [ctx]);
};

export default useSocketSetup;

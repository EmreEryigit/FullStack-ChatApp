import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useState,
} from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import useSocketSetup from "./useSocket";

interface FriendContextProps {
    friendList: { username: string; connected: boolean }[];
    setFriendList: Dispatch<SetStateAction<any[]>>;
}

export const FriendContext = createContext<FriendContextProps | null>(null);

const Home = () => {
    const [friendList, setFriendList] = useState<any[]>([
        { username: "John Doe", connected: false },
        { username: "Steven", connected: true },
    ]);
    useSocketSetup()
    return (
        <FriendContext.Provider value={{ friendList, setFriendList }}>
            <Grid templateColumns="repeat(10, 1fr)" height="100vh" as={Tabs}>
                <GridItem colSpan={3} borderRight="1px solid gray">
                    <Sidebar />
                </GridItem>
                <GridItem colSpan={7}>
                    <Chat />
                </GridItem>
            </Grid>
        </FriendContext.Provider>
    );
};

export default Home;

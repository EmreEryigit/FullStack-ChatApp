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
    friendList: { username: string; connected: boolean , userid: string}[];
    setFriendList: Dispatch<SetStateAction<any[]>>;
}
interface MessagesContextProps {
    messages: any[];
    setMessages: Dispatch<SetStateAction<any[]>>;
}
export const FriendContext = createContext<FriendContextProps | null>(null);
export const MessagesContext = createContext<MessagesContextProps | null>(null);

const Home = () => {
    const [friendList, setFriendList] = useState<any[]>([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [friendIndex, setFriendIndex] = useState(0);
    useSocketSetup(setFriendList, setMessages);
    return (
        <FriendContext.Provider value={{ friendList, setFriendList }}>
            <Grid
                templateColumns="repeat(10, 1fr)"
                height="100vh"
                as={Tabs}
                onChange={(index: any) => setFriendIndex(index)}
            >
                <GridItem colSpan={3} borderRight="1px solid gray">
                    <Sidebar />
                </GridItem>
                <GridItem colSpan={7} maxH="100vh">
                    <MessagesContext.Provider value={{ messages, setMessages }}>
                        <Chat userid={friendList[friendIndex]?.userid}/>
                    </MessagesContext.Provider>
                </GridItem>
            </Grid>
        </FriendContext.Provider>
    );
};

export default Home;

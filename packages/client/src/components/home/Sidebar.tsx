import { ChatIcon } from "@chakra-ui/icons";
import {
    Button,
    Circle,
    Divider,
    Heading,
    HStack,
    Tab,
    TabList,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import AddFriendModal from "./AddFriendModal";
import { FriendContext } from "./Home";

const Sidebar = () => {
    const ctx = useContext(FriendContext)!;
    console.log(ctx.friendList);
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <>
            <VStack py="1.4rem">
                <HStack justify="space-evenly" w="100%">
                    <Heading size="md">Add Friend</Heading>
                    <Button onClick={onOpen}>
                        <ChatIcon />
                    </Button>
                </HStack>
                <Divider />
                <VStack as={TabList}>
                    {ctx.friendList.map((friend, i) => (
                        <HStack as={Tab} key={i}>
                            <Circle
                                background={
                                    friend.connected ? "green.700" : "red.500"
                                }
                                minW="10px"
                                minH="10px"
                            />
                            <Text>{friend.username}</Text>
                        </HStack>
                    ))}
                </VStack>
            </VStack>
            <AddFriendModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default Sidebar;

import { ChatIcon } from "@chakra-ui/icons";
import { Button, Circle, Divider, Heading, HStack, Tab, TabList, Text, useDisclosure, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import AddFriendModal from "./AddFriendModal";
import { FriendContext } from "./Home";

const Sidebar = () => {
    const ctx = useContext(FriendContext)!
    const {isOpen, onClose, onOpen} = useDisclosure()
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
                {/* <HStack as={Tab}>
                    <Circle background="red.500" minW="10px" minH="10px"/>
                    <Text>John Smith</Text>
                </HStack>
                <HStack as={Tab}>
                <Circle background="green.500" minW="10px" minH="10px"/>
                    <Text>John Smith</Text>
                </HStack> */}
                {ctx.friendList.map((friend) => (
                     <HStack as={Tab}>
                     <Circle background={friend.connected ? "green.700": "red.500"} minW="10px" minH="10px"/>
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

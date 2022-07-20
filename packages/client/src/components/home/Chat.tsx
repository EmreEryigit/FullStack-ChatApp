import { TabPanel, TabPanels, Text, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";
import ChatBox from "./ChatBox";
import { FriendContext, MessagesContext } from "./Home";

const Chat = ({ userid }: { userid: string }) => {
    const ctx = useContext(FriendContext)!;
    const { messages } = useContext(MessagesContext)!;
    const bottomDiv = useRef<HTMLDivElement>(null)

    useEffect(() => {
      bottomDiv.current?.scrollIntoView()
    }, [])
    if (ctx.friendList.length === 0) {
        return (
            <VStack
                justify="center"
                pt="5rem"
                w="100%"
                textAlign="center"
                fontSize="lg"
            >
                <TabPanels>
                    <Text>No friends added. Click to add friends</Text>
                </TabPanels>
            </VStack>
        );
    }
    return (
        <VStack h="100vh" justify="end">
            <TabPanels overflowY="scroll">
                {ctx.friendList.map((friend) => (
                    <VStack
                        flexDirection="column-reverse"
                        as={TabPanel}
                        key={`chat:${friend.username}`}
                        w="100%"
                    >
                      <div ref={bottomDiv}/>
                        {messages
                            .filter(
                                (msg) =>
                                    msg.to === friend.userid ||
                                    msg.from === friend.userid
                            )
                            .map((message, i) => (
                                <Text
                                    m={
                                        message.to === friend.userid
                                            ? "1rem 0 0 auto !important"
                                            : "1rem auto 0 0 !important"
                                    }
                                    bg={
                                        message.to === friend.userid
                                            ? "blue.100"
                                            : "gray.100"
                                    }
                                    color="gray.800"
                                    borderRadius="10px"
                                    p="0.5rem 1rem"
                                    key={`msg:${friend.username}${i}`}
                                    fontSize="lg"
                                >
                                    {message.content}
                                </Text>
                            ))}
                    </VStack>
                ))}
            </TabPanels>
            <ChatBox userid={userid} />
        </VStack>
    );
};

export default Chat;

import { Button, HStack, Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import socket from "../../socket";
import { MessagesContext } from "./Home";
const ChatBox = ({ userid }: { userid: string }) => {
    const {setMessages} = useContext(MessagesContext)!
    return (
        <Formik
            initialValues={{ message: "" }}
            validationSchema={Yup.object({
                message: Yup.string().min(1, "Must be 3 chars").max(255).required(),
              })}
            onSubmit={(values, actions) => {
                const message = {from: null, to: userid, content: values.message}
                
                socket.emit("dm", message)
                setMessages(prev => [message, ...prev])
                console.log(values.message)
                actions.resetForm()
            }}
        >
            <HStack as={Form} w="100%" p="1.4rem">
                <Input as={Field} name="message" placeholder="Type your message here..." size="lg" autoComplete="off"/>
                <Button type="submit" size="lg" colorScheme="teal">
                    Send
                </Button>
            </HStack>
        </Formik>
    );
};

export default ChatBox;

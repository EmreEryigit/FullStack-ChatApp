import {
    Button,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { friendsSchema } from "@whatsapp-clone/common";
import { Form, Formik } from "formik";
import React, { useCallback, useContext, useState } from "react";
import socket from "../../socket";
import TextField from "../TextField";
import { FriendContext } from "./Home";

interface AddFriendModalProps {
    isOpen: boolean;
    onClose: () => void;
}
const AddFriendModal = ({ isOpen, onClose }: AddFriendModalProps) => {
    const [error, setError] = useState("");
    const closeModal = useCallback(() => {
        setError("");
        onClose();
    }, [onClose]);
    const ctx = useContext(FriendContext)!
    return (
        <Modal isOpen={isOpen} onClose={closeModal} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add a friend!</ModalHeader>
                <ModalCloseButton />
                <Formik
                    initialValues={{ friendName: "" }}
                    onSubmit={(values, actions) => {
                        socket.emit(
                            "add_friend",
                            values.friendName,
                            ({
                                errorMsg,
                                done,
                                newFriend

                            }: {
                                errorMsg: string;
                                done: boolean;
                                newFriend: {[key: string]: string}
                            }) => {
                                if (done) {
                                    ctx.setFriendList(prev => [newFriend, ...prev])
                                    onClose();
                                    return;
                                }
                                setError(errorMsg);
                            }
                        );
                        actions.resetForm();
                    }}
                    validationSchema={friendsSchema}
                >
                    <Form>
                        <ModalBody>
                            <Heading
                                as="p"
                                color="red.500"
                                fontSize="xl"
                                textAlign="center"
                            >
                                {error}
                            </Heading>
                            <TextField
                                label="Friend's Name"
                                placeholder="Enter friend's username"
                                autoComplete="off"
                                name="friendName"
                            />
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" type="submit">
                                Submit
                            </Button>
                        </ModalFooter>
                    </Form>
                </Formik>
            </ModalContent>
        </Modal>
    );
};

export default AddFriendModal;

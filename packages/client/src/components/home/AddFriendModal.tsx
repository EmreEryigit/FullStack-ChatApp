import {
    Button,
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
import React from "react";
import TextField from "../TextField";

interface AddFriendModalProps {
    isOpen: boolean;
    onClose: () => void;
}
const AddFriendModal = ({ isOpen, onClose }: AddFriendModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add a friend!</ModalHeader>
                <ModalCloseButton />
                <Formik
                    initialValues={{ friendName: "" }}
                    onSubmit={(values, actions) => {
                        actions.resetForm();
                        onClose();
                    }}
                    validationSchema={friendsSchema}
                >
                    <Form>
                        <ModalBody>
                            <TextField
                                label="Friend's Name"
                                placeholder="Enter friend's username"
                                autocomplete="off"
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

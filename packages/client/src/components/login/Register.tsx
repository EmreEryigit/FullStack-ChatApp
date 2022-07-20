import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, VStack, Heading, Text } from "@chakra-ui/react";
import formSchema from "@whatsapp-clone/common";
import { Form, Formik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../AccountContext";

import TextField from "../TextField";

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const ctx = useContext(AccountContext);
    if (!ctx) {
        return null;
    }
    const { setUser } = ctx;
    return (
        <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={formSchema}
            onSubmit={(values, actions) => {
                const vals = { ...values };
                fetch("http://localhost:4000/auth/register", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(vals),
                })
                    .catch((e) => {
                        return;
                    })
                    .then((res) => {
                        if (!res || !res.ok || res.status >= 400) {
                            return;
                        }
                        return res.json();
                    })
                    .then((data) => {
                        if (!data) return;
                        console.log(data.status)

                        if (data.status) {
                            setError(data.status);
                            return 
                        } 
                        navigate("/home");
                        setUser({ ...data });
                    });
                actions.resetForm();
            }}
        >
            {(formik) => (
                <VStack
                    as={Form}
                    w={{ base: "90%", md: "500px" }}
                    m="auto"
                    justify="center"
                    h="100vh"
                    spacing="1rem"
                >
                    <Heading>Sign Up</Heading>
                    <Text as="p" color="red.400">
                        {error}
                    </Text>
                    <TextField
                        name="username"
                        placeholder="Enter Username"
                        autoComplete="off"
                        label="Username"
                    />
                    <TextField
                        name="password"
                        placeholder="Enter Password"
                        autoComplete="off"
                        label="Password"
                        type="password"
                    />

                    <ButtonGroup pt="1rem">
                        <Button colorScheme="teal" type="submit">
                            Create Account
                        </Button>
                        <Button
                            onClick={() => navigate("/")}
                            leftIcon={<ArrowBackIcon />}
                        >
                            Go to Login
                        </Button>
                    </ButtonGroup>
                </VStack>
            )}
        </Formik>
    );
};

export default Register;

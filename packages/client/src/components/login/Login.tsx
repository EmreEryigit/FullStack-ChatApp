import { Button, ButtonGroup, VStack, Heading, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import formSchema from "@whatsapp-clone/common";
import TextField from "./TextField";
import { AccountContext } from "../AccountContext";
import { useContext, useState } from "react";

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<null | string>(null)
    const ctx = useContext(AccountContext)
    if(!ctx) {
        return null
    }
    const {setUser} = ctx
    return (
        <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={formSchema}
            onSubmit={(values, actions) => {
                const vals = { ...values };
                console.log(vals)
                fetch("http://localhost:4000/auth/login", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(vals),
                }).catch((e) => {
                    return;
                }).then(res => {
                    if(!res || !res.ok || res.status >= 400) {
                        return ;
                    }
                    return res.json()
                }).then(data => {
                    if(!data) return
                    if(data.status) {
                        setError(data.status)
                        return 
                    }
                    navigate("/home")
                    setUser({...data})
                })
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
                    <Heading>Log In</Heading>
                    <Text as="p" color="red.400">{error}</Text>
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
                            Log In
                        </Button>
                        <Button onClick={() => navigate("/register")}>
                            Create Account
                        </Button>
                    </ButtonGroup>
                </VStack>
            )}
        </Formik>
    );
};

export default Login;

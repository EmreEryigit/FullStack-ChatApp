import { Box, Spinner } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import Home from "./home/Home";
import Login from "./login/Login";
import Register from "./login/Register";
import PrivateRoutes from "./PrivateRoutes";

const Views = () => {
    const ctx = useContext(AccountContext);

    if (ctx?.user.loggedIn === null) {
        return (
            <Box w="100%" h="50vh" display="flex" justifyContent="center" alignItems="center">
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
            </Box>
        );
    }
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoutes />}>
                <Route path="/home" element={<Home />} />
            </Route>
            <Route path="*" element={<Login />} />
        </Routes>
    );
};

export default Views;

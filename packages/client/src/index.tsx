import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import AccountContextProvider from "./components/AccountContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <>
        <BrowserRouter>
            <AccountContextProvider>
                <ColorModeScript
                    initialColorMode={theme.config.initialColorMode}
                />
                <ChakraProvider theme={theme}>
                    <App />
                </ChakraProvider>
            </AccountContextProvider>
        </BrowserRouter>
    </>
);

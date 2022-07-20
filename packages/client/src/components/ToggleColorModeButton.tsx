import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";
import React from "react";

const ToggleColorModeButton = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <div>
            <Button
                onClick={() => toggleColorMode()}
                pos="absolute"
                top="0"
                right="0"
                m="1rem"
            >
                {colorMode === "dark" ? <SunIcon color="orange.400" /> : <MoonIcon color="blue.300" />}
            </Button>
        </div>
    );
};

export default ToggleColorModeButton;

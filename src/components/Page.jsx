import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import NavBar from "../components/NavBar";

const Page = props => {
  return (
    <Flex
      background="cyan.900"
      height="100%"
      minHeight="100vh"
      width="100vw"
      flexDirection="column"
      alignItems="center"
    >
      <NavBar />
      <Box marginTop="4rem">
        {props.children}
      </Box>
    </Flex>
  )
}

export default Page;

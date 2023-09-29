import React from "react";
import { Flex } from "@chakra-ui/react";
import NavBar from "../components/NavBar";

const Page = props => {
  return (
    <Flex
      background='cyan.900'
      height='100vh'
      width='100vw'
      flexDirection='column'
      alignItems='center'
    >
      <NavBar />
      {props.children}
    </Flex>
  )
}

export default Page;

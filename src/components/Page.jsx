import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/react';
import NavBar from '../components/NavBar';

const Page = props => {
  return (
    <Flex
      background='gray.300'
      height='100%'
      minHeight='100dvh'
      width='100vw'
      flexDirection='column'
      alignItems='center'
    >
      <NavBar />
      <Box marginTop='4rem'>
        {props.children}
      </Box>
      <Flex flex='1' alignItems='end' justifyContent='center' padding='1rem' whiteSpace='pre-wrap' background='transparent'>
          Made with ♥ by <Link href='https://github.com/ohjohnsen' target='_blank'>Øystein Holvik Johnsen</Link>
        </Flex>
    </Flex>
  )
}

export default Page;

import React from 'react';
import { Page } from '../components';
import { Flex, Heading, Text } from '@chakra-ui/react';

const MainPage = () => {
  return (
    <Page>
      <Flex
        width='100%'
        maxWidth='50rem'
        direction='column'
        gap='1rem'
        margin='2rem 0'>
        <Heading size="lg">Kiai!</Heading>
        <Text size="lg">
          Denne nettsiden er laget for å hjelpe med å pugge teori til gradering i NTN (National Taekwon-Do Norway) sine klubber.
          Du kan både slå opp teori, og du kan teste deg selv med en quiz for å se om du gradvis blir bedre.
        </Text>
        <Text size="lg">
          Lykke til!
        </Text>
      </Flex>
    </Page>
  );
};

export default MainPage;

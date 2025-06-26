import React from 'react';
import { Box, Button, Flex, IconButton, Image } from '@chakra-ui/react';
import { Menu } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdHome } from 'react-icons/md';
import Logo from '../assets/logo.png';
import Banner from '../assets/banner.svg';

const NavBar = () => {
  return (
    <Box
      as='nav'
      height='4rem'
      minHeight='4rem'
      width='100%'
      top='0'
      position='fixed'
      zIndex='1000'>
      <Flex
        flexDirection='row'
        height='100%'
        width='100%'
        alignItems='center'
        justifyContent='right'
        padding='0 1rem'
        background='blue.400'
      >
        <Link to='/' background="red">
          <Flex direction='row'>
            <Image src={Logo} height='3rem' marginRight='1rem' />
            <Image
              src={Banner}
              alt='Taekwon-Do Quiz logo'
              width='25rem'
              height='3rem'
              objectFit='contain'
            />
          </Flex>
        </Link>
        <Box flexGrow='1' />
        <IconButton
          as={Link}
          to='/'
          background='transparent'
          fontSize='1.5rem'
          _hover={{ background: '#ffffff60' }}>
          <MdHome color='black'/>
        </IconButton>

        <Menu.Root>
          <Menu.Trigger asChild>
            <Button
              px={4}
              borderRadius={5}
              background='transparent'
              _hover={{ background: '#ffffff60' }}
              color='black'
            >
              Terminologi
            </Button>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content marginTop='-0.5rem'>
              <Menu.Item asChild _hover={{ background: 'gray.200' }}>
                <Link to='/terminology'>
                  Teori
                </Link>
              </Menu.Item>
              <Menu.Item asChild _hover={{ background: 'gray.200' }}>
                <Link to='/terminologyquiz'>
                  Quiz
                </Link>
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
        {/* <Menu>
          <MenuButton
            as={Button}
            px={4}
            borderRadius={5}
            background='transparent'
            _hover={{ background: '#ffffff60' }}
          >
            Stillinger
          </MenuButton>
          <MenuList marginTop='-0.5rem'>
            <MenuItem>
              Teori
            </MenuItem>
            <MenuItem>
              Quiz
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            as={Button}
            px={4}
            borderRadius={5}
            background='transparent'
            _hover={{ background: '#ffffff60' }}
          >
            Slag
          </MenuButton>
          <MenuList marginTop='-0.5rem'>
            <MenuItem>
              Teori
            </MenuItem>
            <MenuItem>
              Quiz
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            as={Button}
            px={4}
            borderRadius={5}
            background='transparent'
            _hover={{ background: '#ffffff60' }}
          >
            Spark
          </MenuButton>
          <MenuList marginTop='-0.5rem'>
            <MenuItem>
              Teori
            </MenuItem>
            <MenuItem>
              Quiz
            </MenuItem>
          </MenuList>
        </Menu> */}
      </Flex>
    </Box>
  );
}

export default NavBar;

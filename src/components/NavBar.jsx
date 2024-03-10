import React from 'react';
import { Box, Button, Flex, IconButton, Img, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdHome } from 'react-icons/md';
import Logo from '../assets/logo.svg';

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
        padding='0 2rem'
        background='blue.400'
      >
        <Link to='/' background="red">
          <Img src={Logo} alt='Taekwon-Do Quiz logo' width='25rem' />
        </Link>
        <Box flexGrow='1' />
        <Menu>
          <IconButton
            as={Link}
            to='/'
            icon={<MdHome />}
            background='transparent'
            fontSize='1.5rem'
            _hover={{ background: '#ffffff60' }}
          />
        </Menu>

        <Menu>
          <MenuButton
            as={Button}
            px={4}
            borderRadius={5}
            background='transparent'
            _hover={{ background: '#ffffff60' }}
          >
            Terminologi
          </MenuButton>
          <MenuList marginTop='-0.5rem'>
            <MenuItem as={Link} to='/terminology'>
              Teori
            </MenuItem>
            <MenuItem as={Link} to='/terminologyquiz'>
              Quiz
            </MenuItem>
          </MenuList>
        </Menu>
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

import React from "react";
import { Box, Button, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";

const NavBar = () => {
  return (
    <Box as="nav" height="5rem" width="100%" top="0" position="sticky">
      <Flex
        flexDirection="row"
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="right"
        paddingRight="2rem"
        background="teal.300"
      >
        <Menu>
          <IconButton
            as={Link}
            to="/"
            icon={<MdHome />}
            background="transparent"
            _hover={{ background: "#ffffff60" }}
          />
        </Menu>

        <Menu>
          <MenuButton
            as={Button}
            px={4}
            borderRadius={5}
            background="transparent"
            _hover={{ background: "#ffffff60" }}
          >
            Terminologi
          </MenuButton>
          <MenuList marginTop="-0.5rem">
            <MenuItem as={Link} to="/terminology">
              Teori
            </MenuItem>
            <MenuItem as={Link} to="/terminologyquiz">
              Quiz
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            as={Button}
            px={4}
            borderRadius={5}
            background="transparent"
            _hover={{ background: "#ffffff60" }}
          >
            Stillinger
          </MenuButton>
          <MenuList marginTop="-0.5rem">
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
            background="transparent"
            _hover={{ background: "#ffffff60" }}
          >
            Slag
          </MenuButton>
          <MenuList marginTop="-0.5rem">
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
            background="transparent"
            _hover={{ background: "#ffffff60" }}
          >
            Spark
          </MenuButton>
          <MenuList marginTop="-0.5rem">
            <MenuItem>
              Teori
            </MenuItem>
            <MenuItem>
              Quiz
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}

export default NavBar;

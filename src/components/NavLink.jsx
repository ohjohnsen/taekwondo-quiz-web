import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";

const NavLink = props => {
  const { children } = props;
  return (
    <Box>
      {children}
    </Box>
  );
}

export default NavLink;

import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import { navbarTabArray, NavbarTabType } from "../../settings";
import { navbar } from "../../styles";

const NavBar: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={navbar}>
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        {" "}
        {navbarTabArray.map((el: NavbarTabType, index: number) => (
          <BottomNavigationAction
            key={index}
            icon={<el.icon />}
            aria-label={el.ariaLabel}
            label={el.label}
            component={Link}
            to={el.to}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};

export default NavBar;

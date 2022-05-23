import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

import { navbarTabArray, NavbarTabType } from "../../settings";
import { navbar, navbarTab } from "../../styles";

const NavBar: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={navbar}>
      <Tabs
        value={value}
        centered
        //variant="scrollable"
        scrollButtons="auto"
        aria-label="icon tabs example"
        onChange={handleChange}
      >
        {navbarTabArray.map((el: NavbarTabType, index: number) => (
          <Tab
            key={index}
            icon={<el.icon />}
            aria-label={el.ariaLabel}
            label={el.label}
            sx={navbarTab}
            component={Link}
            to={el.to}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default NavBar;

import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeIcon from "@mui/icons-material/Home";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

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
        <Tab
          icon={<HomeIcon />}
          aria-label="dashboard"
          label="Dashboard"
          sx={navbarTab}
          component={Link}
          to="/dashboard"
        />
        <Tab
          icon={<AlignHorizontalLeftIcon />}
          aria-label="transactions"
          label="Transactions"
          sx={navbarTab}
          component={Link}
          to="/transactions"
        />
        <Tab
          icon={<PersonPinIcon />}
          aria-label="person"
          label="Profile"
          sx={navbarTab}
          component={Link}
          to="/profile"
        />
      </Tabs>
    </Box>
  );
};

export default NavBar;

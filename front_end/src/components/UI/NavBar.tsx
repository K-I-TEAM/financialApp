import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeIcon from "@mui/icons-material/Home";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
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
          sx={{ fontSize: 10 }}
          component={Link}
          to="/dashboard"
        />
        <Tab
          icon={<AlignHorizontalLeftIcon />}
          aria-label="transactions"
          label="Transactions"
          sx={{ fontSize: 10 }}
          component={Link}
          to="/transactions"
        />
        <Tab
          icon={<PersonPinIcon />}
          aria-label="person"
          label="Profile"
          sx={{ fontSize: 10 }}
          component={Link}
          to="/profile"
        />
      </Tabs>
    </div>
  );
};

export default NavBar;

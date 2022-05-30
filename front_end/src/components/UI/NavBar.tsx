import React from "react";
import { Link, matchPath } from "react-router-dom";
import { Box } from "@mui/system";
import { useLocation } from "react-router";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import { navbarTabArray, NavbarTabType } from "../../settings";
import { navbar } from "../../styles";

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

const NavBar: React.FC = () => {
  const routeMatch = useRouteMatch(["/dashboard", "/transactions", "/profile"]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Box sx={navbar}>
      <BottomNavigation showLabels value={currentTab}>
        {" "}
        {navbarTabArray.map((el: NavbarTabType, index: number) => (
          <BottomNavigationAction
            key={index}
            icon={<el.icon />}
            aria-label={el.ariaLabel}
            label={el.label}
            component={Link}
            to={el.to}
            value={el.to}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};

export default NavBar;

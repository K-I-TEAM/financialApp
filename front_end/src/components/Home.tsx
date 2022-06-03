import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";

import Auth from "./../store/user/auth";
import { isAuthenticatedSelector } from "../selectors";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location: any = useLocation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  useEffect(() => {
    if (isAuthenticated) {
      const origin = location.state?.from?.pathname || "/dashboard";
      navigate(origin);
    }
  }, [isAuthenticated, location.state?.from?.pathname, navigate]);
  return (
    <>
      {" "}
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography
          fontSize="22px"
          color="primary"
          fontWeight="600"
          sx={{ p: 3 }}
        >
          Your Financial App
        </Typography>
        <Box width="80%">
          <img src={require("./../images/Money.png")} alt="" width="100%" />
        </Box>
        <Button
          variant="contained"
          onClick={() => {
            Auth.federatedSignIn();
          }}
        >
          Sign In / Sign Up
        </Button>
      </Box>
    </>
  );
};

export default Home;

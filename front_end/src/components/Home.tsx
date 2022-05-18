import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";

import Auth from "./../store/user/auth";
import { isAuthenticatedSelector } from "../selectors";

const Home = (props: any) => {
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
      <h2>Home component</h2>
      <button
        type="button"
        onClick={() => {
          Auth.federatedSignIn();
        }}
      >
        Sign In
      </button>
    </>
  );
};

export default Home;

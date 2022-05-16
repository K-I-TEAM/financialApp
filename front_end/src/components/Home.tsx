import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import Auth from "./../store/user/auth";

const Home = (props: any) => {
  const navigate = useNavigate();
  const location: any = useLocation();

  useEffect(() => {
    if (props.isAuthenticated) {
      const origin = location.state?.from?.pathname || "/dashboard";
      navigate(origin);
    }
  }, [props.isAuthenticated, location.state?.from?.pathname, navigate]);
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

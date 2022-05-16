import React from "react";
import Auth from "./../store/user/auth";

const Home = () => (
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

export default Home;

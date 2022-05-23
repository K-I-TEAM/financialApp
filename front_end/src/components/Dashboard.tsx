import React from "react";
import { useSelector } from "react-redux";

import { userSelector } from "../selectors";
const Dashboard: React.FC = () => {
  const user = useSelector(userSelector);
  return (
    <>
      {" "}
      <h2>Dashboard component (protected)</h2>
      <div>Authenticated as {user.name}</div>
    </>
  );
};
export default Dashboard;

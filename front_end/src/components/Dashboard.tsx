import React from "react";

const Dashboard = (props: any) => (
  <>
    {" "}
    <h2>Dashboard component (protected)</h2>
    <div>Authenticated as {props.user}</div>
  </>
);

export default Dashboard;

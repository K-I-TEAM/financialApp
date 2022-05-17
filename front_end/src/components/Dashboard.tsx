import React, { useEffect, useState } from "react";
import Auth from "./../store/user/auth";
const Dashboard = (props: any) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getUser() {
      const session = await Auth.currentSession();
      const user = await Auth.currentAuthenticatedUser();
      setUser(session.getIdToken().decodePayload().name);
      console.log(user);
    }
    getUser();
  }, []);
  return (
    <>
      {" "}
      <h2>Dashboard component (protected)</h2>
      <div>Authenticated as {user}</div>
    </>
  );
};
export default Dashboard;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { Avatar, Typography, Button, List } from "@mui/material";

import { userSelector } from "../selectors";
import { signOut } from "../actions";
import EditInPlaceComponent from "./UI/EditInPlaceComponent";

const Profile: React.FC = () => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  return (
    <>
      {" "}
      <Box sx={{ px: 3 }}>
        <h2>{user.name}</h2>
        <Box>
          <Avatar src="" sx={{ width: 100, height: 100 }} />
        </Box>
        <List dense sx={{ py: 3 }}>
          <EditInPlaceComponent data={user.email} label="Email address" />
          <EditInPlaceComponent data={user.name} label="Name" />
          <EditInPlaceComponent data={user.surname} label="Surname" />
          <EditInPlaceComponent data={user.telephone} label="Phone number" />
          <EditInPlaceComponent data={user.birthday} label="Birthday" />
          <EditInPlaceComponent data={user.gender} label="Gender" />
        </List>
        <Button variant="contained" onClick={() => dispatch(signOut())}>
          Sign Out
        </Button>
      </Box>
    </>
  );
};

export default Profile;

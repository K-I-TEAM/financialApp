import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { Avatar, Typography, Button } from "@mui/material";

import { userSelector } from "../selectors";
import { signOut } from "../actions";

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
        <Box sx={{ py: 3 }}>
          <Typography>Email address: {user.email}</Typography>
          <Typography>Default currency: EURO</Typography>
        </Box>
        <Button variant="contained" onClick={() => dispatch(signOut())}>
          Sign Out
        </Button>
      </Box>
    </>
  );
};

export default Profile;

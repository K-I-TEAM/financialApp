import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Box } from "@mui/system";
import { Avatar, Button, List, ListItem, ListItemText } from "@mui/material";

import { userSelector } from "../selectors";
import { signOut } from "../actions";
import { userFieldsToEdit } from "../settings";

const Profile: React.FC = () => {
  const user = useSelector(userSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("user: ", user);
  }, [user]);
  return (
    <>
      {" "}
      <Box sx={{ px: 3 }}>
        <h2>{user.name}</h2>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Avatar src="" sx={{ width: 100, height: 100 }} />
          </Box>
          <Box>
            <Button variant="outlined">Change avatar</Button>
          </Box>
        </Box>
        <List dense sx={{ py: 1 }}>
          {userFieldsToEdit.map((field) => (
            <ListItem key={field}>
              {" "}
              <ListItemText
                primary={`${field[0].toUpperCase() + field.slice(1)}: `}
                secondary={user[field]}
              />
            </ListItem>
          ))}
        </List>

        <Button variant="contained" onClick={() => dispatch(signOut())}>
          Sign Out
        </Button>
        <Button sx={{ ml: 1 }} variant="contained" onClick={() => {}}>
          Categories
        </Button>
        <Button
          sx={{ ml: 1 }}
          variant="outlined"
          onClick={() => {
            navigate("/edit-profile");
          }}
        >
          Edit
        </Button>
      </Box>
    </>
  );
};

export default Profile;

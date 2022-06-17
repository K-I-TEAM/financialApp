import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormControl, Select, MenuItem, Button } from "@mui/material";
import { InputLabel } from "@material-ui/core";

import { userSelector } from "../selectors";
import { updateUser } from "../actions";
import BasicDatePicker from "./UI/BasicDatePicker";

const EditProfile = () => {
  const user = useSelector(userSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [family_name, setFamily_name] = useState(user.family_name);
  const [birthdate, setBirthdate] = useState(user.birthdate);
  const [phone_number, setPhone_number] = useState(user.phone_number);
  const [gender, setGender] = useState(user.gender);
  const saveChanges = () => {
    dispatch(
      updateUser({ email, name, family_name, birthdate, phone_number, gender })
    );
    navigate("/profile");
  };

  return (
    <Box p={2} width="100%">
      <form>
        <Typography my={2} variant="h4">
          Edit Profile
        </Typography>
        <TextField
          sx={{ my: 1 }}
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ my: 1 }}
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          sx={{ my: 1 }}
          fullWidth
          label="Family name"
          value={family_name}
          onChange={(e) => setFamily_name(e.target.value)}
        />
        <Box sx={{ width: "100%", my: 1 }}>
          <BasicDatePicker
            value={new Date(birthdate)}
            label={"Birthday"}
            changeHandler={setBirthdate}
          />
        </Box>
        <TextField
          sx={{ my: 1 }}
          fullWidth
          label="Phone"
          value={phone_number}
          onChange={(e) => setPhone_number(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={gender}
            label="Gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value={"male"}>male</MenuItem>
            <MenuItem value={"female"}>female</MenuItem>
          </Select>
        </FormControl>
        <Button sx={{ mt: 2 }} variant="contained" onClick={saveChanges}>
          Save changes
        </Button>
        <Button
          sx={{ mt: 2, ml: 1 }}
          variant="outlined"
          onClick={() => {
            navigate("/profile");
          }}
        >
          Cancel
        </Button>
      </form>
    </Box>
  );
};
export default EditProfile;

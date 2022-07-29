import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormControl, Select, MenuItem, Button } from "@mui/material";
import { InputLabel } from "@material-ui/core";

import { userSelector } from "../selectors";
import { updateUser } from "../actions";
import BasicDatePicker from "./UI/BasicDatePicker";
import { createControl, validate, validateForm } from "../formFramework";
import Input from "./UI/Input";

const EditProfile = () => {
  const user = useSelector(userSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createFormControls = () => {
    return {
      email: createControl(
        {
          label: "Email",
          sx: { my: 1 },
          fullWidth: true,
          value: user.email,
        },
        {
          required: true,
          email: true,
        }
      ),
      name: createControl(
        {
          label: "Name",
          sx: { my: 1 },
          fullWidth: true,
          value: user.name,
        },
        {
          required: true,
        }
      ),
    };
  };
  const [formControls, setFormControls] = useState(createFormControls());
  const [isFormValid, setIsFormValid] = useState(false);
  const [family_name, setFamily_name] = useState(user.family_name);
  const [birthdate, setBirthdate] = useState(user.birthdate);
  const [phone_number, setPhone_number] = useState(user.phone_number);
  const [gender, setGender] = useState(user.gender);
  const saveChanges = () => {
    dispatch(
      updateUser({
        email: formControls.email.value,
        name: formControls.name.value,
        family_name,
        birthdate,
        phone_number,
        gender,
      })
    );
    navigate("/profile");
  };
  const controlChangeHandler = (
    value: string,
    controlName: keyof typeof formControls
  ) => {
    const newControl = {
      ...formControls[controlName],
      value: value,
      touched: true,
      valid: validate(value, formControls[controlName].validation),
    };
    setFormControls({ ...formControls, [controlName]: newControl });
    setIsFormValid(
      validateForm({ ...formControls, [controlName]: newControl })
    );
  };
  const renderControls = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName as keyof typeof formControls];
      return (
        <Input
          label={control.label}
          key={index}
          sx={control.sx}
          value={control.value}
          valid={control.valid}
          shouldValidate={!!control.validation}
          touched={control.touched}
          onChange={(e) =>
            controlChangeHandler(
              (e.target as HTMLInputElement).value,
              controlName as keyof typeof formControls
            )
          }
        />
      );
    });
  };
  return (
    <Box p={2} width="100%">
      <form>
        <Typography my={2} variant="h4">
          Edit Profile
        </Typography>
        {renderControls()}
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
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          onClick={saveChanges}
          disabled={!isFormValid}
        >
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

import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItem,
  TextField,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";

import { CategoryType } from "../defaultState";
import IconSet from "./IconSet";
import ColorPicker from "./UI/ColorPicker";
import {
  createControl,
  validate,
  validateForm,
  isInvalid,
} from "../formFramework";

type PropsType = {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (category: CategoryType, id?: string | undefined) => void;
  category?: CategoryType | null;
};

const Category = ({ open, handleClose, handleSubmit, category }: PropsType) => {
  const [color, setColor] = useState("#B56666");
  const createFormControls = () => {
    return {
      description: createControl({ shouldValidate: true }, { required: true }),
      icon: createControl({ shouldValidate: true }, { required: true }),
      name: createControl({ shouldValidate: true }, { required: true }),
    };
  };
  const [formControls, setFormControls] = useState(createFormControls());
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    if (category) {
      setColor(category.color);
      setFormControls({
        name: {
          ...formControls.name,
          value: category.name,
          valid: true,
        },
        description: {
          ...formControls.description,
          value: category.description,
          valid: true,
        },
        icon: {
          ...formControls.icon,
          value: category.icon,
          valid: true,
        },
      });
    }
  }, [category]);
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

  return (
    <>
      <Dialog open={open} onClose={handleClose} disableEnforceFocus>
        <DialogTitle>Category</DialogTitle>
        <DialogContent>
          <ColorPicker color={color} handler={setColor} />
          <TextField
            margin="dense"
            label="Name"
            error={isInvalid(formControls.name)}
            helperText={isInvalid(formControls.name) ? "Incorrect data" : null}
            type="text"
            fullWidth
            variant="standard"
            value={formControls.name.value}
            onChange={(e) => controlChangeHandler(e.target.value, "name")}
          />
          <TextField
            margin="dense"
            label="Description"
            error={isInvalid(formControls.description)}
            helperText={
              isInvalid(formControls.description) ? "Incorrect data" : null
            }
            type="text"
            fullWidth
            variant="standard"
            value={formControls.description.value}
            onChange={(e) =>
              controlChangeHandler(e.target.value, "description")
            }
          />
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel id="icon-set-checkbox-label">Icon</InputLabel>
            <Select
              labelId="icon-set-checkbox-label"
              id="icon-set-checkbox"
              value={formControls.icon.value}
              onChange={(e) => controlChangeHandler(e.target.value, "icon")}
              input={<OutlinedInput label="Icon" />}
            >
              {IconSet.map((icon) => (
                <MenuItem key={icon.name} value={icon.name}>
                  <ListItem
                    component="div"
                    dense
                    secondaryAction={<icon.component />}
                  >
                    <ListItemText primary={icon.name} />
                  </ListItem>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            disabled={!isFormValid}
            onClick={() => {
              if (category) {
                handleSubmit(
                  {
                    name: formControls.name.value,
                    color,
                    icon: formControls.icon.value,
                    description: formControls.description.value,
                  },
                  category.id
                );
              } else {
                handleSubmit({
                  name: formControls.name.value,
                  color,
                  icon: formControls.icon.value,
                  description: formControls.description.value,
                });
              }
              handleClose();
            }}
          >
            Submit
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Category;

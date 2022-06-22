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

type PropsType = {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (category: CategoryType, id?: string | undefined) => void;
  category?: CategoryType | null;
};

const Category = ({ open, handleClose, handleSubmit, category }: PropsType) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");
  useEffect(() => {
    if (category) {
      setDescription(category.description as string);
      setIcon(category.icon);
      setColor(category.color);
      setName(category.name);
    }
  }, [category]);
  return (
    <>
      <Dialog open={open} onClose={handleClose} disableEnforceFocus>
        <DialogTitle>Category</DialogTitle>
        <DialogContent>
          <ColorPicker color={color} handler={setColor} />
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel id="icon-set-checkbox-label">Icon</InputLabel>
            <Select
              labelId="icon-set-checkbox-label"
              id="icon-set-checkbox"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
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
            onClick={() => {
              if (category) {
                handleSubmit({ name, color, icon, description }, category.id);
              } else {
                handleSubmit({ name, color, icon, description });
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

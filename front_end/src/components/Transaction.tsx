import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { userSelector } from "./../selectors";
import { CategoryType } from "./../defaultState";

type PropsType = {
  open: boolean;
  handleClose: React.MouseEventHandler;
};
const Transaction: React.FC<PropsType> = ({ open, handleClose }) => {
  const { categories } = useSelector(userSelector);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCurrentCategory(event.target.value as string);
  };
  const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentName(event.target.value);
  const changeAmountHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentAmount(event.target.value);
  return (
    <>
      {" "}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Transaction</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="name"
            type="text"
            fullWidth
            variant="standard"
            value={currentName}
            onChange={changeNameHandler}
          />
          <TextField
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
            value={currentAmount}
            onChange={changeAmountHandler}
          />
          <FormControl fullWidth variant="standard" sx={{ mt: 1 }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentCategory}
              label="Age"
              onChange={handleChangeCategory}
            >
              {categories.map((category: CategoryType) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Submit</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Transaction;

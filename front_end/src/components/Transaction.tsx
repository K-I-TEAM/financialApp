import { useState, useEffect } from "react";
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
import axios from "axios";

import { userSelector } from "./../selectors";
import {
  CategoryType,
  TransactionType,
  TransactionTypeType,
} from "./../defaultState";

type PropsType = {
  open: boolean;
  handleClose: React.MouseEventHandler;
  addTransactionHandler: (transaction: TransactionType) => void;
  dialogType: string;
  chosenTransaction?: TransactionType;
};
const Transaction: React.FC<PropsType> = ({
  open,
  handleClose,
  addTransactionHandler,
  dialogType,
  chosenTransaction,
}) => {
  const { categories } = useSelector(userSelector);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  useEffect(() => {
    if (
      dialogType === "edit" &&
      chosenTransaction &&
      chosenTransaction.categoryId
    ) {
      setCurrentCategory(chosenTransaction.categoryId);
      setCurrentDescription(chosenTransaction.description);
      setCurrentAmount(chosenTransaction.amount.toString());
    } else {
      setCurrentCategory("");
      setCurrentDescription("");
      setCurrentAmount("");
    }
  }, [dialogType, chosenTransaction]);
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCurrentCategory(event.target.value as string);
  };
  const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentDescription(event.target.value);
  const changeAmountHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentAmount(event.target.value);
  const submitHandler = () => {
    axios
      .post("https://localhost:3001/categories", {
        name: "Home",
        description: "Home goods",
        icon: "AccountBalanceIcon",
        color: "#ff8000",
      })
      .then((res) => console.log("res:", res))
      .catch((err) => console.log("err:", err));
    addTransactionHandler({
      id: Math.random().toString(),
      date: new Date(),
      description: currentDescription,
      type: dialogType as TransactionTypeType,
      amount: Number(currentAmount),
      categoryId: currentCategory,
    });
  };
  const deleteHandler = () => {};
  return (
    <>
      {" "}
      <Dialog open={open} onClose={handleClose} disableEnforceFocus>
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
            value={currentDescription}
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
              label="Category"
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
          {dialogType === "edit" ? (
            <Button onClick={deleteHandler}>Delete</Button>
          ) : null}
          <Button onClick={submitHandler}>Submit</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Transaction;

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

import { userSelector } from "./../selectors";
import {
  CategoryType,
  TransactionType,
  TransactionTypeType,
} from "./../defaultState";
import BasicDataPicker from "./UI/BasicDatePicker";

type PropsType = {
  open: boolean;
  handleClose: React.MouseEventHandler;
  addTransactionHandler: (transaction: TransactionType, userId: string) => void;
  updateTransactionHandler: (transaction: TransactionType | undefined) => void;
  deleteTransactionHandler: (transaction: TransactionType | undefined) => void;
  dialogType: string;
  chosenTransaction?: TransactionType;
};
const Transaction: React.FC<PropsType> = ({
  open,
  handleClose,
  addTransactionHandler,
  updateTransactionHandler,
  deleteTransactionHandler,
  dialogType,
  chosenTransaction,
}) => {
  const { categories, id } = useSelector(userSelector);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  useEffect(() => {
    if (
      dialogType === "edit" &&
      chosenTransaction &&
      chosenTransaction.category
    ) {
      setCurrentDate(chosenTransaction.date);
      setCurrentCategory(chosenTransaction.category);
      setCurrentDescription(chosenTransaction.description);
      setCurrentAmount(chosenTransaction.amount.toString());
    } else {
      setCurrentDate(new Date());
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
  const changeDateHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentDate(new Date(event.target.value));
  const submitHandler = () => {
    dialogType === "edit" && chosenTransaction
      ? updateTransactionHandler({
          date: currentDate,
          category: currentCategory,
          description: currentDescription,
          amount: Number(currentAmount),
          type: chosenTransaction.type,
          id: chosenTransaction.id,
        })
      : addTransactionHandler(
          {
            date: currentDate,
            description: currentDescription,
            type: dialogType as TransactionTypeType,
            amount: Number(currentAmount),
            category: currentCategory,
          },
          id
        );
  };
  const deleteHandler = () => {
    deleteTransactionHandler(chosenTransaction);
  };
  return (
    <>
      {" "}
      <Dialog open={open} onClose={handleClose} disableEnforceFocus>
        <DialogTitle>Transaction</DialogTitle>
        <DialogContent>
          <BasicDataPicker
            label="Date"
            value={currentDate}
            changeHandler={setCurrentDate}
          />
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

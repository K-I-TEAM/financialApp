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
import Select from "@mui/material/Select";
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
import {
  createControl,
  validate,
  validateForm,
  isInvalid,
} from "../formFramework";

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
  const createFormControls = () => {
    return {
      currentDate: createControl({ shouldValidate: true }, { required: true }),
      currentCategory: createControl(
        { shouldValidate: true },
        { required: true }
      ),
      currentDescription: createControl(
        {
          shouldValidate: true,
          autoFocus: true,
          margin: "dense",
          fullWidth: true,
          variant: "standard",
          label: "Name",
        },
        { required: true }
      ),
      currentAmount: createControl(
        {
          shouldValidate: true,
          type: "number",
          margin: "dense",
          fullWidth: true,
          variant: "standard",
          label: "Amount",
        },
        { required: true }
      ),
    };
  };
  const [formControls, setFormControls] = useState(createFormControls());
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    if (
      dialogType === "edit" &&
      chosenTransaction &&
      chosenTransaction.category
    ) {
      setFormControls({
        currentDescription: {
          ...formControls.currentDescription,
          value: chosenTransaction.description,
          valid: true,
        },
        currentAmount: {
          ...formControls.currentAmount,
          value: chosenTransaction.amount.toString(),
          valid: true,
        },
        currentDate: {
          ...formControls.currentDate,
          value: chosenTransaction.date,
          valid: true,
        },
        currentCategory: {
          ...formControls.currentCategory,
          value: chosenTransaction.category,
          valid: true,
        },
      });
    } else {
      setFormControls({
        currentDescription: { ...formControls.currentDescription, value: "" },
        currentAmount: { ...formControls.currentAmount, value: "" },
        currentDate: {
          ...formControls.currentDate,
          value: new Date(),
          valid: true,
        },
        currentCategory: { ...formControls.currentCategory, value: "" },
      });
    }
  }, [dialogType, chosenTransaction]);

  const submitHandler = () => {
    dialogType === "edit" && chosenTransaction
      ? updateTransactionHandler({
          date: formControls.currentDate.value
            ? formControls.currentDate.value.toISOString().slice(0, 10)
            : "",
          category: formControls.currentCategory.value,
          description: formControls.currentDescription.value,
          amount: Number(formControls.currentAmount.value),
          type: chosenTransaction.type,
          id: chosenTransaction.id,
        })
      : addTransactionHandler(
          {
            date: formControls.currentDate.value
              ? formControls.currentDate.value.toISOString().slice(0, 10)
              : "",
            description: formControls.currentDescription.value,
            type: dialogType as TransactionTypeType,
            amount: Number(formControls.currentAmount.value),
            category: formControls.currentCategory.value,
          },
          id
        );
  };
  const deleteHandler = () => {
    deleteTransactionHandler(chosenTransaction);
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

  return (
    <>
      {" "}
      <Dialog open={open} onClose={handleClose} disableEnforceFocus>
        <DialogTitle>Transaction</DialogTitle>
        <DialogContent>
          <BasicDataPicker
            label="Date"
            value={formControls.currentDate.value}
            changeHandler={(newValue) => {
              const newControl = {
                ...formControls.currentDate,
                touched: true,
                value: newValue,
              };
              setFormControls({ ...formControls, currentDate: newControl });
              setIsFormValid(
                validateForm({ ...formControls, currentDate: newControl })
              );
            }}
            onError={(e: any) => {
              const newControl = {
                ...formControls.currentDate,
                touched: true,
                valid: !e,
              };
              setFormControls({ ...formControls, currentDate: newControl });
              setIsFormValid(
                validateForm({ ...formControls, currentDate: newControl })
              );
            }}
          />
          <TextField
            autoFocus={formControls.currentDescription.autoFocus}
            margin={formControls.currentDescription.margin}
            label={formControls.currentDescription.label}
            type="text"
            error={isInvalid(formControls.currentDescription)}
            helperText={
              isInvalid(formControls.currentDescription)
                ? "Incorrect data"
                : null
            }
            fullWidth={formControls.currentDescription.fullWidth}
            variant={formControls.currentDescription.variant}
            value={formControls.currentDescription.value}
            onChange={(e) =>
              controlChangeHandler(e.target.value, "currentDescription")
            }
          />
          <TextField
            margin={formControls.currentAmount.margin}
            label={formControls.currentAmount.label}
            type={formControls.currentAmount.type}
            fullWidth={formControls.currentAmount.fullWidth}
            variant={formControls.currentAmount.variant}
            value={formControls.currentAmount.value}
            error={isInvalid(formControls.currentAmount)}
            helperText={
              isInvalid(formControls.currentAmount) ? "Incorrect data" : null
            }
            onChange={(e) =>
              controlChangeHandler(e.target.value, "currentAmount")
            }
          />
          <FormControl fullWidth variant="standard" sx={{ mt: 1 }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formControls.currentCategory.value}
              label="Category"
              onChange={(e) =>
                controlChangeHandler(e.target.value, "currentCategory")
              }
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
          <Button disabled={!isFormValid} onClick={submitHandler}>
            Submit
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Transaction;

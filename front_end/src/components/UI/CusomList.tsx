import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ListItem,
  List,
  ListItemAvatar,
  ListItemText,
  Typography,
  Skeleton,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from "@mui/material";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import AddCardIcon from "@mui/icons-material/AddCard";
import CreditCardIcon from "@mui/icons-material/CreditCard";

import { TransactionType, CategoryType } from "../../defaultState";
import Transaction from "../Transaction";
import { addTransaction } from "./../../actions";
import { transactionSelector } from "./../../selectors";

type PropsType = {
  items: Immutable.List<TransactionType> | null;
  categories: Array<CategoryType>;
  maxAmount: number;
  categorized?: Boolean;
};

const CustomList: React.FC<PropsType> = ({
  items,
  categories,
  maxAmount,
  categorized = false,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogType, setOpenDialogType] = useState("");
  const [chosenId, setChosenId] = useState("");
  const dispatch = useDispatch();
  const chosenTransaction = useSelector(transactionSelector(chosenId));
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const addTransactionHandler = (transaction: TransactionType) => {
    dispatch(addTransaction(transaction));
    setOpenDialog(false);
  };
  const handleChooseItem = (id: string) => {
    setChosenId(id);
    setOpenDialogType("edit");
    setOpenDialog(true);
  };
  return (
    <>
      <Transaction
        open={openDialog}
        handleClose={handleCloseDialog}
        dialogType={openDialogType}
        addTransactionHandler={addTransactionHandler}
        chosenTransaction={chosenTransaction}
      />
      <List component="div" disablePadding sx={{ pt: 2, position: "relative" }}>
        {items ? (
          items
            .toJS()
            .slice(0, maxAmount)
            .map((item: any) => {
              return (
                <ListItem
                  key={item.description}
                  sx={{
                    pl: 6,
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                  }}
                  secondaryAction={
                    <Typography>
                      {item.type === "expense" ? "- " : null}
                      {item.amount}$
                    </Typography>
                  }
                  onClick={() => handleChooseItem(item.id)}
                >
                  <ListItemAvatar>
                    <Brightness1Icon
                      fontSize="small"
                      sx={{
                        color: categories.filter(
                          (category: CategoryType) =>
                            category.id === item.categoryId
                        )[0].color,
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={item.description} />
                </ListItem>
              );
            })
        ) : (
          <>
            {[...Array(maxAmount)].map((_, index) => (
              <Skeleton key={index} height={50} />
            ))}
          </>
        )}
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", top: -200, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {" "}
          <SpeedDialAction
            key={"add-expense"}
            icon={<AddCardIcon />}
            tooltipTitle={"add expense"}
            onClick={() => {
              setOpenDialog(true);
              setOpenDialogType("expense");
            }}
          />
          <SpeedDialAction
            key={"add-income"}
            icon={<CreditCardIcon />}
            tooltipTitle={"add income"}
            onClick={() => {
              setOpenDialog(true);
              setOpenDialogType("income");
            }}
          />
        </SpeedDial>
      </List>
    </>
  );
};
export default CustomList;

import { useEffect, useState } from "react";
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
import Avatar from "@mui/material/Avatar";
import { ListItemButton, Collapse, Divider } from "@mui/material";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import AddCardIcon from "@mui/icons-material/AddCard";
import CreditCardIcon from "@mui/icons-material/CreditCard";

import { TransactionType, CategoryType } from "../../defaultState";
import Transaction from "../Transaction";
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionsByCategory,
  setTransactionsByCategory,
} from "./../../actions";
import {
  transactionSelector,
  transactionsByCategorySelector,
} from "./../../selectors";
import IconSet from "./../IconSet";

type PropsType = {
  items: Immutable.List<TransactionType> | null;
  categories: Array<CategoryType>;
  maxAmount?: number;
  categorized?: Boolean;
  currentDate?: Date;
};

const CustomList: React.FC<PropsType> = ({
  items,
  categories,
  maxAmount,
  categorized = false,
  currentDate = null,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogType, setOpenDialogType] = useState("");
  const [chosenId, setChosenId] = useState("");
  const [categoryIdToOpen, setCategoryIdToOpen] = useState("");
  const dispatch = useDispatch();
  const chosenTransaction = useSelector(transactionSelector(chosenId));
  const transactionsByCategory = useSelector(transactionsByCategorySelector);
  useEffect(() => {
    if (currentDate) {
      setCategoryIdToOpen("");
    }
  }, [currentDate]);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const addTransactionHandler = (
    transaction: TransactionType,
    userId: string
  ) => {
    dispatch(addTransaction({ transaction, userId }));
    setOpenDialog(false);
  };
  const updateTransactionHandler = (
    transaction: TransactionType | undefined
  ) => {
    dispatch(updateTransaction(transaction));
    setOpenDialog(false);
  };
  const deleteTransactionHandler = (
    transaction: TransactionType | undefined
  ) => {
    dispatch(deleteTransaction(transaction));
    setOpenDialog(false);
  };
  const handleChooseItem = (id: string) => {
    setChosenId(id);
    setOpenDialogType("edit");
    setOpenDialog(true);
  };
  const handleClickCategory = (id: any) => {
    dispatch(setTransactionsByCategory(null));
    if (categoryIdToOpen === id) {
      setCategoryIdToOpen("");
    } else {
      setCategoryIdToOpen(id);
      dispatch(getTransactionsByCategory(id));
    }
  };
  return (
    <>
      <Transaction
        open={openDialog}
        handleClose={handleCloseDialog}
        dialogType={openDialogType}
        addTransactionHandler={addTransactionHandler}
        updateTransactionHandler={updateTransactionHandler}
        deleteTransactionHandler={deleteTransactionHandler}
        chosenTransaction={chosenTransaction}
      />
      {categorized ? (
        <List>
          {categories.map((category) => (
            <div key={category.id}>
              {" "}
              <ListItemButton onClick={() => handleClickCategory(category.id)}>
                <ListItem
                  secondaryAction={<Typography>{category.amount}$</Typography>}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: category.color }}>
                      {IconSet.map((icon: any) =>
                        icon.name === category.icon ? (
                          <icon.component
                            key={icon.name}
                            sx={{ color: "#ffffff" }}
                          />
                        ) : null
                      )}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={category.name} />
                </ListItem>
              </ListItemButton>
              <Divider />
              <Collapse
                in={category.id === categoryIdToOpen}
                timeout="auto"
                unmountOnExit
              >
                {/* <List component="div" disablePadding>
                  <Typography textAlign="center">today</Typography>
                  <Divider />
                  <ListItem
                    sx={{ pl: 6 }}
                    secondaryAction={<Typography>30$</Typography>}
                  >
                    <ListItemAvatar>
                      <Brightness1Icon
                        fontSize="small"
                        sx={{ color: "#3C009E" }}
                      />
                    </ListItemAvatar>
                    <ListItemText primary="Dishes" />
                  </ListItem>
                  <Divider />
                  <Typography textAlign="center">26/05/2022</Typography>
                  <Divider />
                  <ListItem
                    sx={{ pl: 6 }}
                    secondaryAction={<Typography>270$</Typography>}
                  >
                    <ListItemAvatar>
                      <Brightness1Icon
                        fontSize="small"
                        sx={{ color: "#3C009E" }}
                      />
                    </ListItemAvatar>
                    <ListItemText primary="Bucket" />
                  </ListItem>
                  <Divider />
                  <ListItem
                    sx={{ pl: 6 }}
                    secondaryAction={<Typography>270$</Typography>}
                  >
                    <ListItemAvatar>
                      <Brightness1Icon
                        fontSize="small"
                        sx={{ color: "#3C009E" }}
                      />
                    </ListItemAvatar>
                    <ListItemText primary="Towels (returned to store)" />
                  </ListItem>
                  <Divider />
                </List> */}
                <List
                  component="div"
                  disablePadding
                  sx={{ pt: 2, position: "relative" }}
                >
                  {transactionsByCategory ? (
                    transactionsByCategory
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
                                      category.id === item.category
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
                      {[...Array(2)].map((_, index) => (
                        <Skeleton key={index} height={50} />
                      ))}
                    </>
                  )}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      ) : (
        <List
          component="div"
          disablePadding
          sx={{ pt: 2, position: "relative" }}
        >
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
                              category.id === item.category
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
      )}
    </>
  );
};
export default CustomList;

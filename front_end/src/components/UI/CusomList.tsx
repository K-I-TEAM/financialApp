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
import { useState } from "react";

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
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <Transaction open={openDialog} handleClose={handleCloseDialog} />
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
                >
                  <ListItemAvatar>
                    <Brightness1Icon
                      fontSize="small"
                      sx={{
                        color: categories.filter(
                          (category: CategoryType) =>
                            category.id === item.categoryId
                        )[0].colour,
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

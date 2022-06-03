import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import List from "@mui/material/List";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import { ListItem } from "@mui/material";
import { Divider } from "@mui/material";
import { ListItemAvatar } from "@mui/material";

import DashboardChart from "./DashboardChart";
import {
  currentDateSelector,
  userSelector,
  transactionsSelector,
} from "./../selectors";
import { getTransactions } from "./../actions";
import { TransactionType, CategoryType } from "../defaultState";

const Dashboard: React.FC = () => {
  const currentDate = useSelector(currentDateSelector);
  const user = useSelector(userSelector);
  const transactions = useSelector(transactionsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions({ userId: user.email, date: currentDate }));
  }, [currentDate, dispatch, user.email]);
  return (
    <>
      {" "}
      <Box>
        <Box textAlign="center" sx={{ py: 2 }}>
          Balance
        </Box>
        <Box textAlign="center" fontWeight="bold" sx={{ pb: 2 }}>
          23456.78 $
        </Box>
        <DashboardChart
          transactions={transactions}
          categories={user.categories}
        />
        <List component="div" disablePadding sx={{ pt: 2 }}>
          {transactions.slice(0, 5).map((transaction: TransactionType) => {
            return (
              <>
                <ListItem
                  key={transaction.description}
                  sx={{ pl: 6 }}
                  secondaryAction={
                    <Typography>
                      {transaction.type === "expense" ? "- " : null}
                      {transaction.amount}$
                    </Typography>
                  }
                >
                  <ListItemAvatar>
                    <Brightness1Icon
                      fontSize="small"
                      sx={{
                        color: user.categories.filter(
                          (category: CategoryType) =>
                            category.id === transaction.categoryId
                        )[0].colour,
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={transaction.description} />
                </ListItem>
                <Divider />
              </>
            );
          })}
        </List>
      </Box>
    </>
  );
};
export default Dashboard;

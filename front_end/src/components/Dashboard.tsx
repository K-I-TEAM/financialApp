import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";

import DashboardChart from "./DashboardChart";
import {
  currentDateSelector,
  userSelector,
  transactionsSelector,
} from "./../selectors";
import { getTransactions } from "./../actions";

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
        <DashboardChart transactions={transactions} />
      </Box>
    </>
  );
};
export default Dashboard;

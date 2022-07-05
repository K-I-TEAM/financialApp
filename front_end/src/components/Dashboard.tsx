import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";

import DashboardChart from "./DashboardChart/DashboardChart";
import {
  currentDateSelector,
  userSelector,
  transactionsSelector,
  balanceSelector,
} from "./../selectors";
import { getTransactions } from "./../actions";
import CustomList from "./UI/CusomList";

const Dashboard: React.FC = () => {
  const currentDate = useSelector(currentDateSelector);
  const user = useSelector(userSelector);
  const transactions = useSelector(transactionsSelector);
  const balance = useSelector(balanceSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, [currentDate, dispatch, user.id]);
  return (
    <>
      {" "}
      <Box>
        <Box textAlign="center" sx={{ py: 2 }}>
          Balance
        </Box>
        <Box textAlign="center" fontWeight="bold" sx={{ pb: 2 }}>
          {balance} $
        </Box>
        <DashboardChart
          transactions={transactions ? transactions.toJS() : []}
          categories={user.categories}
          fetched={transactions !== null}
        />{" "}
        <CustomList
          items={transactions}
          maxAmount={5}
          categories={user.categories}
        />
      </Box>
    </>
  );
};
export default Dashboard;

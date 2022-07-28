import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";

import WideSwitch from "./WideSwitch";
import MonthSwitcher from "./UI/MonthSwitcher";
import {
  currentDateSelector,
  userSelector,
  transactionsSelector,
  balanceSelector,
} from "./../selectors";
import { getTransactions, getCategoriesWithAmount } from "./../actions";
import CustomList from "./UI/CusomList";

const Transactions: React.FC = () => {
  const [categorized, setCategorized] = React.useState(true);
  const [currency, setCurrency] = React.useState("EUR");
  const currentDate = useSelector(currentDateSelector);
  const user = useSelector(userSelector);
  const transactions = useSelector(transactionsSelector);
  const balance = useSelector(balanceSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getCategoriesWithAmount());
  }, [currentDate, dispatch, user.id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategorized(event.target.checked);
  };

  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

  return (
    <div>
      <Box>
        <Box textAlign="center" sx={{ py: 2 }}>
          Balance
        </Box>
        <Box textAlign="center" fontWeight="bold" sx={{ pb: 2 }}>
          {balance} $
        </Box>
        <Box textAlign="center">
          <WideSwitch
            checked={categorized}
            onChange={handleChange}
            //  inputProps={{ "aria-label": "controlled" }}
          />
        </Box>
        <Box display="flex" justifyContent="center">
          <MonthSwitcher />
        </Box>
        <Box textAlign="center">
          <TextField
            id="standard-select-currency-native"
            select
            value={currency}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
            helperText="Please select your currency"
            variant="standard"
          >
            {currencies.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Box>
      </Box>
      <CustomList
        items={transactions}
        categories={user.categories}
        categorized={categorized}
        currentDate={currentDate}
      />
    </div>
  );
};

export default Transactions;

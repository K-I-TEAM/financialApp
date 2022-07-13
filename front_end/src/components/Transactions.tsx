import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListItemButton, Collapse, Divider } from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/system";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import TextField from "@mui/material/TextField";

import WideSwitch from "./WideSwitch";
import MonthSwitcher from "./UI/MonthSwitcher";
import {
  currentDateSelector,
  userSelector,
  transactionsSelector,
  balanceSelector,
} from "./../selectors";
import { getTransactions } from "./../actions";
import CustomList from "./UI/CusomList";

const Transactions: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [categorized, setCategorized] = React.useState(true);
  const [currency, setCurrency] = React.useState("EUR");
  const [selectedId, setSelectedId] = React.useState(null);
  const currentDate = useSelector(currentDateSelector);
  const user = useSelector(userSelector);
  const transactions = useSelector(transactionsSelector);
  const balance = useSelector(balanceSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, [currentDate, dispatch, user.id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategorized(event.target.checked);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChooseItem = () => {};
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
      />
      {/* <List>
        <ListItemButton onClick={handleClick}>
          <ListItem secondaryAction={<Typography>300$</Typography>}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "#3C009E" }}>
                <AccountBalanceIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Home" />
          </ListItem>
        </ListItemButton>
        <Divider />
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Typography textAlign="center">today</Typography>
            <Divider />
            <ListItem
              sx={{ pl: 6 }}
              secondaryAction={<Typography>30$</Typography>}
            >
              <ListItemAvatar>
                <Brightness1Icon fontSize="small" sx={{ color: "#3C009E" }} />
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
                <Brightness1Icon fontSize="small" sx={{ color: "#3C009E" }} />
              </ListItemAvatar>
              <ListItemText primary="Bucket" />
            </ListItem>
            <Divider />
            <ListItem
              sx={{ pl: 6 }}
              secondaryAction={<Typography>270$</Typography>}
            >
              <ListItemAvatar>
                <Brightness1Icon fontSize="small" sx={{ color: "#3C009E" }} />
              </ListItemAvatar>
              <ListItemText primary="Towels (returned to store)" />
            </ListItem>
            <Divider />
          </List>
        </Collapse>
        <ListItemButton onClick={handleClick}>
          <ListItem
            component="div"
            secondaryAction={<Typography>50$</Typography>}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "#9CC741" }}>
                <RestaurantIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Food" />
          </ListItem>
        </ListItemButton>
        <Divider />
        <ListItemButton onClick={handleClick}>
          <ListItem
            component="div"
            secondaryAction={<Typography>100$</Typography>}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "#F46F53" }}>
                <AirplanemodeActiveIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Trevel" />
          </ListItem>
        </ListItemButton>
        <Divider />
      </List> */}
    </div>
  );
};

export default Transactions;

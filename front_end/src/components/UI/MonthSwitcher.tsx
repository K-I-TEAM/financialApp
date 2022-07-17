import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

import { DateChangeArrow, ChangeEnum } from "./DateChangeArrow";
import { getMonthYearDate } from "./../../helpers";
import { currentDateSelector } from "../../selectors";

const MonthSwitcher: React.FC = () => {
  const currentDate = useSelector(currentDateSelector);
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        width="300px"
        sx={{ py: 3 }}
      >
        <DateChangeArrow arrowType={ChangeEnum.Dec} />
        <Typography>{getMonthYearDate(currentDate)}</Typography>
        <DateChangeArrow arrowType={ChangeEnum.Inc} />
      </Box>
    </>
  );
};

export default MonthSwitcher;

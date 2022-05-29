import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const MonthSwitcher: React.FC = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        width="300px"
        sx={{ py: 3 }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography>
            <ArrowBackIosNewIcon fontSize="small" />
          </Typography>
        </Box>
        <Typography>December 2022</Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography>
            <ArrowForwardIosIcon fontSize="small" />
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default MonthSwitcher;

import React from "react";
import { Box } from "@mui/system";

import DashboardChart from "./DashboardChart";
const Dashboard: React.FC = () => {
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
        <DashboardChart />
      </Box>
    </>
  );
};
export default Dashboard;

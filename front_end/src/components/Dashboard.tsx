import React from "react";
import { Box } from "@mui/system";

import DashboardChart from "./DashboardChart";
const Dashboard: React.FC = () => {
  return (
    <>
      {" "}
      <Box sx={{ width: "80%", mx: "auto" }}>
        <DashboardChart />
      </Box>
    </>
  );
};
export default Dashboard;

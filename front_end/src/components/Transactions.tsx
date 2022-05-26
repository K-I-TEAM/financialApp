import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";

import { Box } from "@mui/system";

import RoundedIcon from "./UI/RoundedIcon";

const Transactions: React.FC = () => {
  return (
    <div>
      <Box>
        <Box textAlign="center" sx={{ py: 2 }}>
          Balance
        </Box>
        <Box textAlign="center" fontWeight="bold" sx={{ pb: 2 }}>
          23456.78 $
        </Box>
      </Box>
      <Box sx={{ px: 1 }}>
        <Accordion>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <RoundedIcon icon={AccountBalanceIcon} color="#3C009E" />
            <Typography>Home</Typography>
            <Typography sx={{ ml: "auto" }}>300$</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
            <RoundedIcon icon={RestaurantIcon} color="#9CC741" />
            <Typography>Food</Typography>
            <Typography sx={{ ml: "auto" }}>50$</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary aria-controls="panel3a-content" id="panel3a-header">
            <RoundedIcon icon={AirplanemodeActiveIcon} color="#F46F53" />
            <Typography>Trevel</Typography>
            <Typography sx={{ ml: "auto" }}>100$</Typography>
          </AccordionSummary>
        </Accordion>
      </Box>
    </div>
  );
};

export default Transactions;

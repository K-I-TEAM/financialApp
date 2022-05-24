import React from "react";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, registerables } from "chart.js";
import { Box } from "@mui/system";

import { userSelector } from "../selectors";
Chart.register(...registerables);
Chart.register(ArcElement);
const Dashboard: React.FC = () => {
  const user = useSelector(userSelector);

  return (
    <>
      {" "}
      <Box sx={{ width: "80%", mx: "auto" }}>
        <Doughnut
          data={{
            labels: ["one", "two", "tree"],
            datasets: [
              {
                label: "My First Dataset",
                data: [300, 50, 100],
                backgroundColor: [
                  "rgb(255, 99, 132)",
                  "rgb(54, 162, 235)",
                  "rgb(255, 205, 86)",
                ],
                hoverOffset: 4,
                // borderWidth: 30,
                spacing: 0,
                rotation: 40,
              },
            ],
          }}
          options={{
            cutout: "80%",
            plugins: {
              legend: {
                display: false,
              },
              subtitle: {
                display: true,
                text: "Custom Chart Subtitle",
                padding: { bottom: 10 },
              },
              title: {
                display: true,
                text: "Custom Chart Title",
              },
            },
          }}
        />
      </Box>
    </>
  );
};
export default Dashboard;

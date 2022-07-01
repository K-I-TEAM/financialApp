import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, registerables } from "chart.js";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import { Skeleton } from "@mui/material";

import { currentDateSelector } from "../../selectors";
import { setCurrentDate } from "../../actions";
import { calculateTransactions } from "../../helpers";
import * as settings from "./DashboardChartSettings";

Chart.register(...registerables);
Chart.register(ArcElement);

const DashboardChart = ({ transactions, categories, fetched }) => {
  const currentDate = useSelector(currentDateSelector);
  const dispatch = useDispatch();
  const [chartOptions, setChartOptions] = useState(settings.options);
  const [chartData, setChartData] = useState(settings.data);
  Chart.register({
    id: "textinside",
    beforeDraw: settings.textinsidePlugin,
  });
  const changeCurrentDateHandler = (increment) => {
    const date = currentDate;
    date.setDate(1);
    const newDate = new Date(date.setMonth(date.getMonth() + increment));
    dispatch(setCurrentDate(newDate));
  };
  useEffect(() => {
    //const newChartDate = getMonthYearDate(currentDate);
    const calculatedCategories = calculateTransactions(
      transactions,
      categories,
      "expense"
    );
    const labels = calculatedCategories.map((category) => category.name);
    const data = calculatedCategories.map((category) => category.total);
    const backgrounds = calculatedCategories.map((category) => category.color);

    setChartData({
      ...settings.data,
      labels: [...labels],
      datasets: [
        {
          ...settings.data.datasets[0],
          backgroundColor: [...backgrounds],
          data: [...data],
        },
      ],
    });

    setChartOptions({
      ...settings.options,
      plugins: {
        ...settings.options.plugins,
        textinside: {
          ...settings.options.plugins.textinside,
          center: {
            ...settings.options.plugins.textinside.center,
            date: currentDate,
          },
        },
      },
    });
  }, [currentDate, transactions, categories]);
  return fetched ? (
    <Box display="flex" justifyContent="center">
      <Box sx={settings.arrowStyles}>
        <IconButton onClick={() => changeCurrentDateHandler(-1)}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box width="70%">
        <Doughnut data={chartData} options={chartOptions} />
      </Box>
      <Box sx={settings.arrowStyles}>
        <IconButton onClick={() => changeCurrentDateHandler(1)}>
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  ) : (
    <Skeleton variant="circular" width={250} height={250} sx={{ mx: "auto" }} />
  );
};
export default DashboardChart;

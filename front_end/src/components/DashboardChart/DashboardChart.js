import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, registerables } from "chart.js";
import { Box } from "@mui/system";
import { Skeleton } from "@mui/material";

import { currentDateSelector } from "../../selectors";
import { calculateTransactions } from "../../helpers";
import { DateChangeArrow, ChangeEnum } from "../UI/DateChangeArrow";
import * as settings from "./DashboardChartSettings";

Chart.register(...registerables);
Chart.register(ArcElement);

const DashboardChart = ({ transactions, categories, fetched }) => {
  const currentDate = useSelector(currentDateSelector);
  const [chartOptions, setChartOptions] = useState(settings.options);
  const [chartData, setChartData] = useState(settings.data);
  Chart.register({
    id: "textinside",
    beforeDraw: settings.textinsidePlugin,
  });

  useEffect(() => {
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
      <DateChangeArrow
        settings={settings.arrowStyles}
        arrowType={ChangeEnum.Dec}
      />
      <Box width="70%">
        <Doughnut data={chartData} options={chartOptions} />
      </Box>
      <DateChangeArrow
        settings={settings.arrowStyles}
        arrowType={ChangeEnum.Inc}
      />
    </Box>
  ) : (
    <Skeleton variant="circular" width={250} height={250} sx={{ mx: "auto" }} />
  );
};
export default DashboardChart;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, registerables } from "chart.js";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";

import { currentDateSelector } from "./../selectors";
import { setCurrentDate } from "./../actions";

Chart.register(...registerables);
Chart.register(ArcElement);

const getMonthYearDate = (date) => {
  return date.toLocaleString("en-us", { month: "long", year: "numeric" });
};

const getTotal = function (myDoughnutChart) {
  const sum = myDoughnutChart.config.data.datasets[0].data.reduce(
    (a, b) => a + b,
    0
  );
  return `${sum} $`;
};
const data = {
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
};

const options = {
  cutout: "80%",
  plugins: {
    legend: {
      display: false,
    },

    textinside: {
      center: {
        text: getTotal,
        date: getMonthYearDate(new Date()),
        color: "#000000", // Default is #000000
        fontStyle: "Arial", // Default is Arial
        sidePadding: 20, // Default is 20 (as a percentage)
        minFontSize: 25, // Default is 20 (in px), set to false and text will not wrap.
        lineHeight: 40, // Default is 25 (in px), used for when text wraps
      }, //chart.config.options.elements.center;
    },
  },
};
const DashboardChart = ({ transactions }) => {
  const currentDate = useSelector(currentDateSelector);
  const dispatch = useDispatch();
  const [chartOptions, setChartOptions] = useState(options);
  Chart.register({
    id: "textinside",
    beforeDraw: function (chart) {
      if (chart.config.options.plugins.textinside.center) {
        // Get ctx from string
        const ctx = chart.ctx;
        // Get options from the center object in options
        const centerConfig = chart.config.options.plugins.textinside.center;
        const fontStyle = centerConfig.fontStyle || "Arial";
        const txt = centerConfig.text(chart);
        const date = centerConfig.date;
        const color = centerConfig.color || "#000";
        const maxFontSize = centerConfig.maxFontSize || 75;
        const sidePadding = centerConfig.sidePadding || 20;
        const sidePaddingCalculated =
          (sidePadding / 100) * (chart.innerRadius * 2);
        // Start with a base font of 30px
        ctx.font = "30px " + fontStyle;

        // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        const stringWidth = ctx.measureText(txt).width;
        const elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        const widthRatio = elementWidth / stringWidth;
        const newFontSize = Math.floor(30 * widthRatio);
        const elementHeight = chart.innerRadius * 2;

        // Pick a new font size so it will not be larger than the height of label.
        let fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
        let minFontSize = centerConfig.minFontSize;
        const lineHeight = centerConfig.lineHeight || 25;
        let wrapText = false;

        if (minFontSize === undefined) {
          minFontSize = 20;
        }

        if (minFontSize && fontSizeToUse < minFontSize) {
          fontSizeToUse = minFontSize;
          wrapText = true;
        }

        // Set font settings to draw it correctly.
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        let centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
        ctx.font = fontSizeToUse + "px " + fontStyle;
        ctx.fillStyle = color;
        wrapText = true;
        if (!wrapText) {
          ctx.fillText(txt, centerX, centerY);
          return;
        }

        const words = txt.split(" ");
        let line = "";
        const lines = [];

        // Break words up into multiple lines if necessary
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + " ";
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;
          if (testWidth > elementWidth && n > 0) {
            lines.push(line);
            line = words[n] + " ";
          } else {
            line = testLine;
          }
        }
        ctx.fillStyle = "grey";
        ctx.font = "14px " + fontStyle;
        ctx.fillText("Spent", centerX, centerY - 2 * lineHeight);
        ctx.fillStyle = color;
        ctx.font = "bold 20px " + fontStyle;
        ctx.fillText(txt, centerX, centerY - lineHeight);
        ctx.font = "16px " + fontStyle;
        ctx.fillText(date, centerX, centerY);

        // Move the center up depending on line height and number of lines
        //centerY -= (lines.length / 2) * lineHeight;
        //   ctx.fillText("Spent", centerX, centerY - lineHeight);
        /*  for (var n = 0; n < lines.length; n++) {
          ctx.font = "20px " + fontStyle;
          ctx.fillText(lines[n], centerX, centerY);
          centerY += lineHeight;
        } */
        //Draw text in center
        //ctx.fillText(line, centerX, centerY);
      }
    },
  });
  const changeCurrentDateHandler = (increment) => {
    const date = currentDate;
    date.setDate(1);
    console.log("date: ", date);
    const newDate = new Date(date.setMonth(date.getMonth() + increment));
    console.log("new date: ", getMonthYearDate(newDate));
    dispatch(setCurrentDate(newDate));
  };
  useEffect(() => {
    const newChartDate = getMonthYearDate(currentDate);
    setChartOptions({
      cutout: "80%",
      plugins: {
        legend: {
          display: false,
        },

        textinside: {
          center: {
            text: getTotal,
            date: newChartDate,
            color: "#000000", // Default is #000000
            fontStyle: "Arial", // Default is Arial
            sidePadding: 20, // Default is 20 (as a percentage)
            minFontSize: 25, // Default is 20 (in px), set to false and text will not wrap.
            lineHeight: 40, // Default is 25 (in px), used for when text wraps
          }, //chart.config.options.elements.center;
        },
      },
    });
  }, [currentDate]);
  return (
    <Box display="flex" justifyContent="center">
      <Box sx={{ display: "flex", alignItems: "center", px: 1 }}>
        <IconButton onClick={() => changeCurrentDateHandler(-1)}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box width="70%">
        <Doughnut data={data} options={chartOptions} />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", px: 1 }}>
        <IconButton onClick={() => changeCurrentDateHandler(1)}>
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};
export default DashboardChart;

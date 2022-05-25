import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, registerables } from "chart.js";

Chart.register(...registerables);
Chart.register(ArcElement);

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
    subtitle: {
      display: true,
      text: "2098.89 $",
      font: {
        size: 20,
      },
      padding: { bottom: 10 },
    },
    title: {
      display: true,
      text: "Balance",
    },
    textinside: {
      center: {
        text: getTotal,
        color: "#000000", // Default is #000000
        fontStyle: "Arial", // Default is Arial
        sidePadding: 20, // Default is 20 (as a percentage)
        minFontSize: 25, // Default is 20 (in px), set to false and text will not wrap.
        lineHeight: 40, // Default is 25 (in px), used for when text wraps
      }, //chart.config.options.elements.center;
    },
  },
};
const DashboardChart = () => {
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
        ctx.fillText("November 2020", centerX, centerY);

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

  return <Doughnut data={data} options={options} />;
};
export default DashboardChart;

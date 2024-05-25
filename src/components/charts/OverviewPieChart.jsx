import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function OverviewPieChart() {
  const [chartData] = useState({
    series: [6, 2, 4],
    options: {
      legend: {
        position: "top",
      },
      chart: {
        type: "donut",
        height: 200,
      },
      labels: ["Critical", "Unstable", "Stable"],
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        pie: {
          customScale: 1.175,
          expandOnClick: false,
          donut: {
            size: "50%",
          },
        },
      },
    //   colors: ["#FF4560", "#FEB019", "#00E396"], // Custom colors
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="donut"
          height={200} 
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

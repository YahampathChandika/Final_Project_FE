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
      colors: ["#EF4444", "#e6e22e", "#8fb935"], // Custom colors
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

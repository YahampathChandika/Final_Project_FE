import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useGetAdmittedPatientsQuery } from "../../store/api/patientApi";

export default function OverviewPieChart({ onClickSlice }) {
  const { data: patientData, isLoading, error } = useGetAdmittedPatientsQuery();
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      legend: {
        position: "top",
      },
      chart: {
        type: "donut",
        height: 200,
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const riskLevel = ["Low Risk", "Medium Risk", "High Risk"][config.dataPointIndex];
            onClickSlice(riskLevel);
          },
          dataPointMouseEnter: (event, chartContext, config) => {
            chartContext.el.style.cursor = 'pointer';
          },
          dataPointMouseLeave: (event, chartContext, config) => {
            chartContext.el.style.cursor = 'default';
          },
        },
      },
      labels: ["Low Risk", "Medium Risk", "High Risk"],
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
      colors: ["#8fb935", "#e6e22e", "#EF4444"], // Custom colors
    },
  });

  useEffect(() => {
    if (patientData && patientData.payload) {
      setChartData({
        series: [
          patientData.payload.stablePatients,
          patientData.payload.criticalPatients,
          patientData.payload.unstablePatients,
        ],
        options: {
          ...chartData.options,
        },
      });
    }
  }, [patientData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

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

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetPatientVitalsIdQuery } from "../../store/api/patientApi";
import ReactApexChart from "react-apexcharts";

export default function VitalSignsChart() {
  const { id } = useParams();
  const { data: vitalData, isLoading, error } = useGetPatientVitalsIdQuery(id);

  const vitalSigns = [
    { name: "heartRate", color: "#FF5733" },
    { name: "respiratoryRate", color: "#33FF57" },
    { name: "supplementedO2", color: "#3357FF" },
    { name: "O2saturation", color: "#FF33A8" },
    { name: "temperature", color: "#FFC300" },
    { name: "systolicBP", color: "#DAF7A6" },
    { name: "diastolicBP", color: "#900C3F" },
  ];
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (vitalData?.payload) {
      const newChartData = vitalSigns.map((sign) => {
        return {
          name: sign.name,
          color: sign.color,
          series: [
            {
              name: sign.name,
              data: vitalData.payload.map((data) => data[sign.name]),
            },
          ],
          options: {
            chart: {
              height: 200,
              type: "line",
              zoom: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "straight",
            },
            title: {
              text: `${sign.name.charAt(0).toUpperCase() + sign.name.slice(1)} Trends`,
              align: 'left'
            },
            colors: [sign.color],
            grid: {
              row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5,
              },
            },
            xaxis: {
              categories: vitalData.payload.map((data) => data.date),
            },
            markers: {
              size: 3,
            },
            legend: {
              show: true,
              position: "top",
              horizontalAlign: "center",
            },
          },
        };
      });
      setChartData(newChartData);
    }
  }, [vitalData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="grid grid-cols-2 gap-8">
      {chartData.map((chart, index) => (
        <div key={index} className="flex-col w-full bg-white rounded-md justify-between items-center px-5 py-3">
          <ReactApexChart
            options={chart.options}
            series={chart.series}
            type="line"
            height={300}
          />
        </div>
      ))}
    </div>
  );
}

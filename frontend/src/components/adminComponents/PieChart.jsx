import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const { total, tutorShare, siteShare } = data;
  const chartData = {
    labels: ["Tutor Share", "Site Share"],
    datasets: [
      {
        data: [tutorShare, siteShare],
        backgroundColor: ["#1F2F8C", "#50B7E1"],
        hoverBackgroundColor: ["#0C00FF", "#91EEF0"],
      },
    ],
  };

  return (
    <div className="flex flex-col justify-center items-center mt-7 h-96 w-96">
      <h2 className="text-base font-bold mb-5">Total Revenue: {total}</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;

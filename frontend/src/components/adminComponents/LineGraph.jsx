import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const LineGraph = ({ lineData }) => {
  const labels = Array.from({ length: 12 }, (_, i) => `${i + 1}`); // Array of months (1 to 12)
  const salesData = labels.map((month) => {
    const foundData = lineData.find(
      (entry) => entry._id.month === parseInt(month, 10)
    );
    return foundData ? foundData.totalSales : 0;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Sales",
        data: salesData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div className="flex  justify-center items-center mt-7 h-[25rem] w-[80rem]">
      <Line data={data} />
    </div>
  );
};

export default LineGraph;

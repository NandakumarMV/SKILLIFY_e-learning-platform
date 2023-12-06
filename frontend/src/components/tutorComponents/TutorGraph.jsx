import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const TutorGraph = ({ graphData }) => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Courses with their purchases",
      },
    },
  };

  // Extracting data for each dataset
  const uniqueUsersData = graphData.map((course) => course.uniqueUsers);
  const purchaseCountData = graphData.map((course) => course.purchaseCount);
  const totalSalesData = graphData.map((course) => course.totalSales);

  const data = {
    labels: graphData.map((course) => course.courseName), // X-axis labels
    datasets: [
      {
        label: "Users",
        backgroundColor: "#616068",
        borderColor: "#0F0E25",
        borderWidth: 1,
        hoverBackgroundColor: "#9B97DE",
        hoverBorderColor: "#2E2993",
        data: uniqueUsersData,
      },
      {
        label: "Purchase Count",
        backgroundColor: "#9B97DE",
        borderColor: "#2E2993",
        borderWidth: 1,
        hoverBackgroundColor: "#616068",
        hoverBorderColor: "#0F0E25",
        data: purchaseCountData,
      },
      {
        label: "Total Sales",
        backgroundColor: "#F2C94C",
        borderColor: "#F2994A",
        borderWidth: 1,
        hoverBackgroundColor: "#FFD166",
        hoverBorderColor: "#F2AE30",
        data: totalSalesData,
      },
    ],
  };

  return (
    <div className="flex justify-center items-center mt-7 h-[25rem] w-[80rem]">
      <Bar options={options} data={data} />
    </div>
  );
};

export default TutorGraph;

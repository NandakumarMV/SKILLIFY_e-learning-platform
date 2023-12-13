import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TutorPieChart = ({ data }) => {
  const { totalRevenue, tutorShare, siteShare } = data;
  const chartData = {
    labels: ["Your Share", "Site Share"],
    datasets: [
      {
        data: [tutorShare, siteShare],
        backgroundColor: ["#180793", "#F9F923 "],
        hoverBackgroundColor: ["#0D699E", "#D4F834  "],
      },
    ],
  };

  return (
    <div className="flex flex-col justify-center items-center mt-7 mb-5 h-96 w-96">
      <Pie data={chartData} />
    </div>
  );
};

export default TutorPieChart;

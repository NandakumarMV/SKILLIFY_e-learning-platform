import React, { useEffect, useState } from "react";
import { useGetRevenueMutation } from "../../slices/adminApiSlice";
import PieChart from "./PieChart";

const DashBoard = () => {
  const [revenue] = useGetRevenueMutation();
  const [chartData, setChartData] = useState("");
  const getRevenue = async () => {
    console.log("enterensssssssss");
    const res = await revenue().unwrap();
    console.log(res.data);
    setChartData(res.data);
  };
  useEffect(() => {
    console.log("useEffect triggered");
    getRevenue();
  }, []);
  console.log("Render AdminHomePage");
  return (
    <div
      className="
    "
    >
      <h1 className="text-xl text-black font-semibold ">Skillify DashBoard</h1>
      <div>
        <h1 className="flex justify-center items-center mt-7 text-lg text-black font-semibold underline underline-offset-4">
          Revenue Breakdown
        </h1>

        <div className="flex justify-center items-center mt-7">
          {" "}
          <PieChart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

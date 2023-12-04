import React, { useEffect } from "react";
import { useGetRevenueMutation } from "../../slices/adminApiSlice";
import PieChart from "./PieChart";

const AdminHomePage = ({ content }) => {
  console.log(content);
  const [revenue] = useGetRevenueMutation();

  const getRevenue = async () => {
    console.log("enterensssssssss");
    const res = await revenue().unwrap();
    console.log(res.data);
  };
  useEffect(() => {
    console.log("useEffect triggered");
    getRevenue();
  }, [content]);
  console.log("Render AdminHomePage");
  return (
    <div>
      <h1 className="text-lg">Skillify DashBoardlllll</h1>
      <div>
        <h1>Revenue Breakdownddddddd</h1>
        {/* <PieChart data={chartData} /> */}
      </div>
    </div>
  );
};

export default AdminHomePage;

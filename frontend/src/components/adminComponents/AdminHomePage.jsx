import React, { useEffect } from "react";
import { useGetRevenueMutation } from "../../slices/adminApiSlice";
import PieChart from "./PieChart";

const AdminHomePage = ({ content }) => {
  const [revenue] = useGetRevenueMutation();

  const getRevenue = async () => {
    const res = await revenue().unwrap();
  };
  useEffect(() => {
    getRevenue();
  }, [content]);
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

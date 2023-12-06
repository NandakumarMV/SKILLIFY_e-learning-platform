import React, { useEffect, useState } from "react";
import {
  useGetCountsMutation,
  useGetCoursePurchaseDataMutation,
  useGetRevenueMutation,
  useGetWeeklysalesMutation,
  useGetYearlysalesMutation,
  useGetcoursesPerDomainMutation,
} from "../../slices/adminApiSlice";
import PieChart from "./PieChart";
import BarGraph from "./BarGraph";
import LineGraph from "./LineGraph";

const DashBoard = () => {
  const [revenue] = useGetRevenueMutation();
  const [getCounts] = useGetCountsMutation();
  const [purchaseCounts] = useGetCoursePurchaseDataMutation();
  const [domaincoures] = useGetcoursesPerDomainMutation();
  const [monthlySale] = useGetYearlysalesMutation();
  const [weeklySales] = useGetWeeklysalesMutation();
  const [chartData, setChartData] = useState("");
  const [userCount, setUserCount] = useState(0);
  const [tutorCount, setTutorCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [countDomaincourses, setCountDomaincourses] = useState({});
  const [courseData, setCourseData] = useState({
    courseNames: [],
    purchaseCounts: [],
  });
  const [monthlySalesData, setMonthlySalesData] = useState([]);
  const getRevenue = async () => {
    const res = await revenue().unwrap();

    setChartData(res.data);
  };
  const getMontlySales = async () => {
    const res = await monthlySale().unwrap();
    setMonthlySalesData(res.data);
  };
  const getWeeklysales = async () => {
    const res = await weeklySales().unwrap();
    console.log(res);
  };
  const TotalCount = async () => {
    const res = await getCounts().unwrap();
    setUserCount(res.data.usersCount);

    setTutorCount(res.data.tutorCount);
    setCourseCount(res.data.coursesCount);
  };
  const coursesPerdomain = async () => {
    const res = await domaincoures().unwrap();

    setCountDomaincourses(res);
  };
  const coursesPurchase = async () => {
    const res = await purchaseCounts().unwrap();

    setCourseData(res.data);
  };

  useEffect(() => {
    getRevenue();
    TotalCount();
    coursesPerdomain();
    coursesPurchase();
    getMontlySales();
    getWeeklysales();
  }, []);

  return (
    <div
      className="
    "
    >
      <h1 className="text-xl text-black font-semibold ">Skillify DashBoard</h1>
      <div className="flex justify-evenly items-center">
        <div className="bg-amber-400 h-24 w-48 mt-5 flex flex-col shadow-xl shadow-slate-400 justify-center text-base font-sans text-slate-900 font-semibold items-center">
          {" "}
          TOTAL USERS<div className="text-xl"> {userCount}</div>{" "}
        </div>
        <div className="bg-teal-400 h-24 w-48 mt-5 flex  flex-col shadow-xl shadow-slate-400 justify-center text-base font-sans text-slate-900 font-semibold items-center">
          TOTAL TUTORS <div className="text-xl"> {tutorCount}</div>
        </div>
        <div className="bg-rose-400 h-24 w-48 mt-5 flex  flex-col shadow-xl shadow-slate-400 justify-center text-base font-sans text-slate-900 font-semibold items-center">
          TOTAL COURSES <div className="text-xl"> {courseCount}</div>
        </div>
      </div>
      <div>
        <h1 className="flex justify-center items-center mt-7 text-lg text-black font-semibold underline underline-offset-4">
          Revenue Breakdown
        </h1>

        <div className="flex justify-center items-center mt-7 mb-3">
          {" "}
          <PieChart data={chartData} />
        </div>
      </div>
      <div className="flex  text-lg font-bold mt-10 justify-evenly items-center underline underline-offset-4">
        Courses Per Domains
      </div>
      <div className="text-lg flex flex-wrap justify-evenly items-center mt-9">
        {Object.entries(countDomaincourses).map(([domain, count]) => (
          <div key={domain} className="h-24 w-40 ">
            <div className=" bg-cyan-500 p-2 flex flex-col items-center  justify-center shadow-xl shadow-slate-400  transition-transform transform-gpu hover:scale-105">
              <div className="text-lg text-white font-bold ">{domain}</div>{" "}
              <div className="font-extrabold text-white text-lg ">{count} </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold flex justify-center items-center mt-7 mb-2 underline underline-offset-4">
        {" "}
        Purchase Counts
      </h3>
      <div className="flex items-center justify-center">
        {" "}
        <BarGraph graphData={courseData}></BarGraph>
      </div>
      <h3 className="text-lg font-semibold flex justify-center items-center mt-7 mb-2 underline underline-offset-4">
        {" "}
        Monthly Sales
      </h3>
      <div className="flex items-center justify-center">
        {" "}
        <LineGraph lineData={monthlySalesData}></LineGraph>
      </div>
    </div>
  );
};

export default DashBoard;

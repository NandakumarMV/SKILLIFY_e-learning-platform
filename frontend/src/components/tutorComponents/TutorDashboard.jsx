import React, { useEffect, useState } from "react";
import {
  useGetTutorCountsMutation,
  useGetTutorSalesCountsMutation,
} from "../../slices/tutorApiSlice";
import TutorPieChart from "./TutorPieChart";
import TutorGraph from "./TutorGraph";

const TutorDashboard = () => {
  const [getCounts] = useGetTutorCountsMutation();
  const [getSales] = useGetTutorSalesCountsMutation();

  const [totalCourses, setTotalCourses] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, settotalRevenue] = useState(0);
  const [siteShare, setSiteShare] = useState(0);
  const [tutorShare, setTutorShare] = useState(0);
  const [pieData, setPieData] = useState({});
  const [graphData, setGraphData] = useState([]);

  const getCourseSales = async () => {
    const res = await getSales().unwrap();
    setGraphData(res.data.courseSales);
  };
  const getTutorCounts = async () => {
    const res = await getCounts().unwrap();

    setTotalCourses(res.data.totalCourses);
    setTotalUsers(res.data.totalUniqueUsers);
    setSiteShare(res.data.siteShare);
    settotalRevenue(res.data.totalRevenue);
    setTutorShare(res.data.tutorRevenue);
  };

  useEffect(() => {
    getTutorCounts();
    getCourseSales();
  }, []);
  useEffect(() => {
    setPieData({ totalRevenue, siteShare, tutorShare });
  }, [totalRevenue, siteShare, tutorShare]);
  return (
    <div>
      <div className="text-4xl text-blue-900 font-medium flex justify-center mt-7 underline underline-offset-4">
        Dashboard
      </div>
      <div className="flex justify-evenly items-center mt-10">
        <div className="w-40 h-32 items-center justify-center flex flex-col bg-cyan-400 text-lg text-white font-bold shadow-xl shadow-slate-400  transition-transform transform-gpu hover:scale-105">
          Total Courses
          <div>{totalCourses}</div>
        </div>
        <div className="w-40 h-32  items-center justify-center flex flex-col bg-amber-400 text-lg text-white font-bold shadow-xl shadow-slate-400  transition-transform transform-gpu hover:scale-105">
          Total Students
          <div>{totalUsers}</div>
        </div>
      </div>
      <div className="flex justify-center items-center text-2xl text-green-900 font-medium mt-10">
        Revenue
      </div>
      <div className="flex flex-col justify-center items-center mt-5">
        <div className="w-40 h-20  items-center justify-center flex flex-col bg-green-400 text-lg text-white font-bold shadow-xl shadow-slate-400  transition-transform transform-gpu hover:scale-105">
          Total
          <div>{totalRevenue} ₹</div>
        </div>
        <span className="text-sm text-gray-500 font-semibold mt-8">
          30% of the revenue will go to Site{" "}
        </span>
        <div className="mt-7">
          <TutorPieChart data={pieData} />
        </div>
      </div>
      <div className="flex items-center justify-center mt-10 mb-8">
        {" "}
        <TutorGraph graphData={graphData}></TutorGraph>
      </div>
    </div>
  );
};

export default TutorDashboard;

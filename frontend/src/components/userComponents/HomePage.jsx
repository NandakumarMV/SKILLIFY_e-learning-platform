import React, { useEffect, useState } from "react";
import {
  bannerVideo,
  getApprovedAllCouresesUrl,
  getalldoamins,
} from "../../url";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCourses } from "../../slices/courseDetailsSlice";
import { setDomains } from "../../slices/domainSlice";
import { Link } from "react-router-dom";

import "animate.css";

const HomePage = () => {
  const dispatch = useDispatch();

  const [selectedDomain, setSelectedDomain] = useState("MERN STACK");

  const getDomain = async () => {
    try {
      const res = await axios.get(getalldoamins, {
        withCredentials: true,
      });
      const domains = res.data;
      const domainNames = domains.map((domain) => domain.domainName);
      dispatch(setDomains(domainNames));
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    getDomain();
  }, []);

  const getCourses = async () => {
    const res = await axios.get(getApprovedAllCouresesUrl, {
      withCredentials: true,
    });
    console.log(res.data);
    dispatch(setCourses(res.data));
  };

  useEffect(() => {
    getCourses();
  }, []);

  const courses = useSelector((state) => state.courses.courses);
  const domains = useSelector((state) => state.domains.domains);

  // Filter courses by the selected domain
  const filteredCourses =
    selectedDomain && Array.isArray(courses)
      ? courses.filter((course) => course.domain.domainName === selectedDomain)
      : [];

  // ...

  return (
    <div className="">
      <div className="flex justify-center items-center">
        <div className="drop-shadow-2xl mb-8 mt-12 w-[95%] flex flex-col justify-center items-center -z-10 bg-slate-50 h-80">
          <div className="text-[11rem] font-mono  ">SKILLIFY</div>
          <div className="text-2xl font-bold pb-3">
            IGINITE YOUR SKILL, ELEVATE YOUR FUTURE
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mb-5 ">
        <div className="  bg-slate-700 h-16 w-1/2 m-2 flex items-center justify-evenly">
          <p className="text-white tracking-wider text-lg">
            Teach With Us,Earn With Us
          </p>{" "}
          <Link to="/tutor/login">
            <button className="bg-white text-base p-2 hover:bg-black hover:text-white">
              Become a tutor
            </button>
          </Link>
        </div>
      </div>
      <div className="ml-6 ">
        <div className="text-2xl font-medium text-black border-b-[2px] border-solid border-gray-900  w-1/4">
          Courses
        </div>
        <div className="flex text-base items-start justify-between text-violet-400 font-semibold w-2/4 mt-3 mb-4">
          {domains.map((domain, index) => (
            <div
              key={index}
              onClick={() => setSelectedDomain(domain)}
              className={`cursor-pointer ${
                domain === selectedDomain ? "text-blue-800 font-bold" : ""
              }`}
            >
              {domain}
            </div>
          ))}
        </div>
        <div className="mb-4">
          {selectedDomain && (
            <div className="text-xl font-medium text-black mt-2 mb-3">
              Courses in {selectedDomain}
            </div>
          )}
          {filteredCourses?.length > 0 ? (
            <div className="flex flex-wrap  -mx-4">
              {filteredCourses?.map((course, index) => (
                <div
                  key={index}
                  className="w-[31%] bg-slate-100 mx-4 drop-shadow-lg  h-fit  hover:bg-slate-200 hover:shadow-2xl "
                >
                  <Link to={`/course/${course?._id}`}>
                    <div className=" p-3 h-full  flex w-full">
                      {" "}
                      <img
                        className="w-32 h-32"
                        src={course?.thumbnail}
                        alt="thumbnail"
                      />
                      <div className="mx-2">
                        <div className="text-lg font-semibold">
                          {course?.courseName}
                        </div>
                        <p className="pt-3">{course?.caption}</p>
                        <p className="pt-3 text-lg text-blue-600 font-semibold">
                          Price: {course?.price} ₹
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-lg mt-2 h-32">
              No courses available for {selectedDomain}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import { getApprovedAllCouresesUrl, getalldoamins } from "../../url";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCourses } from "../../slices/courseDetailsSlice";
import { setDomains } from "../../slices/domainSlice";
import { Link } from "react-router-dom";

import "animate.css";
import HeartComponent from "./Heartcomponent";

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
    dispatch(setCourses(res.data));
  };

  useEffect(() => {
    getCourses();
  }, []);

  const courses = useSelector((state) => state.courses.courses);
  const domains = useSelector((state) => state.domains.domains);
  const { userInfo } = useSelector((state) => state.auth);

  // Filter courses by the selected domain
  const filteredCourses =
    selectedDomain && Array.isArray(courses)
      ? courses.filter((course) => course.domain.domainName === selectedDomain)
      : [];

  // ...
  const getStartOfLast7Days = () => {
    const now = new Date();
    const startOfLast7Days = new Date(now);

    // Set the date to 7 days ago
    startOfLast7Days.setUTCDate(now.getUTCDate() - 7);

    // Set the time to midnight
    startOfLast7Days.setUTCHours(0, 0, 0, 0);

    return startOfLast7Days.toISOString();
  };

  const latestCourses =
    Array.isArray(courses) &&
    courses?.filter((course) => {
      const isAfterStartOfWeek = course.createdAt >= getStartOfLast7Days();

      return isAfterStartOfWeek;
    });

  return (
    <>
      <div className="">
        <div className="flex justify-center items-center">
          <div className="drop-shadow-2xl mb-8 mt-12 w-[90%] sm:w-[95%] md:w-[80%] lg:w-[70%] flex flex-col justify-center items-center bg-gray-50 h-80">
            <div className="text-6xl sm:text-5xl md:text-6xl lg:text-[11rem] font-mono font-semibold">
              SKILLIFY
            </div>
            <div className="text-base md:text-lg lg:text-xl font-bold pb-3">
              IGNITE YOUR SKILL, ELEVATE YOUR FUTURE
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mb-5">
          <div className="bg-slate-700 h-16 w-full md:w-1/2 m-2 flex items-center justify-evenly">
            <p className="text-white tracking-wider text-base md:text-lg lg:text-xl">
              Teach With Us, Earn With Us
            </p>{" "}
            <Link to="/tutor/login">
              <button className="bg-white text-base md:text-lg p-2 hover:bg-black hover:text-white">
                Become a Tutor
              </button>
            </Link>
          </div>
        </div>

        <div className="ml-6 ">
          <div className="text-2xl font-medium text-black border-b-[2px] border-solid border-gray-900  lg:w-1/4 md:[50%]">
            Courses
          </div>
          <div className="flex text-base items-start justify-between text-violet-400 font-semibold lg:w-2/4 md:[80%] mt-3 mb-4">
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
          <div className="">
            {selectedDomain && (
              <div className="text-xl font-medium text-black mt-2 ">
                Courses in {selectedDomain}
              </div>
            )}
            {filteredCourses?.length > 0 ? (
              <>
                <div className="flex flex-wrap  -mx-4">
                  {filteredCourses?.map((course, index) => (
                    <div
                      key={index}
                      className="lg:w-[31%] mt-2 md:[50%] bg-slate-50 mx-4 drop-shadow-lg  h-fit  hover:bg-slate-100 hover:shadow-2xl "
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
                            <p className="pt-3 line-clamp-3">
                              {course?.caption}
                            </p>
                            <p className="pt-3 text-lg text-blue-600 font-semibold">
                              Price: {course?.price} ₹
                            </p>

                            <div className=" flex justify-between items-center">
                              {course.averageRating > 0 && (
                                <div className=" flex justify-center items-center">
                                  <p className="  font-medium text-base text-black-800">
                                    {course.averageRating}
                                  </p>
                                  <div className="text-lg text-amber-500">
                                    {" "}
                                    ★{" "}
                                  </div>
                                  <div className="text-base text-black">
                                    rating
                                  </div>
                                </div>
                              )}
                              <div className="text-base font-medium text-blue-800">
                                {course?.videos.length} videos
                              </div>
                              {userInfo && (
                                <div className="text-sm">
                                  {" "}
                                  <HeartComponent courseId={course._id} />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-gray-500 text-lg mt-2 h-40">
                No courses available for {selectedDomain}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-16"></div>
      <div className="font-serif text-2xl flex justify-center ">
        Most Rated Courses
      </div>
      <div className="flex flex-wrap  justify-between ">
        {Array.isArray(courses) &&
          courses?.map(
            (course, index) =>
              course.averageRating > 3 && (
                <div
                  key={index}
                  className="lg:w-[30%] md:w-[50%] bg-slate-50 mx-4 my-4 drop-shadow-lg  hover:bg-slate-100 hover:shadow-2xl "
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
                        <p className="pt-3  max-w-full line-clamp-2">
                          {course?.caption}
                        </p>
                        <p className="pt-3 text-lg text-blue-600 font-semibold">
                          Price: {course?.price} ₹
                        </p>

                        <div className=" flex justify-between items-center ">
                          {course.averageRating > 0 && (
                            <div className=" flex justify-center items-center">
                              <p className="  font-medium text-base text-black-800">
                                {course.averageRating}
                              </p>
                              <div className="text-lg text-amber-500"> ★ </div>
                              <div className="text-base text-black">rating</div>
                            </div>
                          )}
                          <div className="text-base font-medium  text-blue-800 ">
                            {course?.videos.length} videos
                          </div>
                          {userInfo && (
                            <div className="text-sm">
                              {" "}
                              <HeartComponent courseId={course._id} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )
          )}
      </div>
      <div className="h-16"></div>
      <div className="font-serif text-2xl flex justify-center ">
        Popular Courses
      </div>
      <div className="flex flex-wrap  justify-between ">
        {Array.isArray(courses) &&
          courses?.map(
            (course, index) =>
              course?.purchaseCount >= 1 && (
                <div
                  key={index}
                  className="lg:w-[30%] md:w-[50%] bg-slate-50 mx-4 my-4 drop-shadow-lg  hover:bg-slate-100 hover:shadow-2xl "
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
                        <p className="pt-3  max-w-full line-clamp-2">
                          {course?.caption}
                        </p>
                        <p className="pt-3 text-lg text-blue-600 font-semibold">
                          Price: {course?.price} ₹
                        </p>

                        <div className=" flex justify-between items-center ">
                          {course.averageRating > 0 && (
                            <div className=" flex justify-center items-center">
                              <p className="  font-medium text-base text-black-800">
                                {course.averageRating}
                              </p>
                              <div className="text-lg text-amber-500"> ★ </div>
                              <div className="text-base text-black">rating</div>
                            </div>
                          )}
                          <div className="text-base font-medium  text-blue-800 ">
                            {course?.videos.length} videos
                          </div>
                          {userInfo && (
                            <div className="text-sm">
                              {" "}
                              <HeartComponent courseId={course._id} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )
          )}
      </div>
      {Array.isArray(latestCourses) && latestCourses?.length > 0 && (
        <div className="font-serif text-2xl flex justify-center ">
          Latest Courses
        </div>
      )}

      <div className="flex flex-wrap justify-between">
        {Array.isArray(latestCourses) &&
          latestCourses?.map((course, index) => (
            <div
              key={index}
              className="lg:w-[30%] md:w-[50%] bg-slate-50 mx-4 my-4 drop-shadow-lg  hover:bg-slate-100 hover:shadow-2xl "
            >
              <Link to={`/course/${course?._id}`}>
                <div className=" p-3 h-full  flex w-full">
                  <img
                    className="w-32 h-32"
                    src={course?.thumbnail}
                    alt="thumbnail"
                  />
                  <div className="mx-2">
                    <div className="text-lg font-semibold">
                      {course?.courseName}
                    </div>
                    <p className="pt-3  max-w-full line-clamp-2">
                      {course?.caption}
                    </p>
                    <p className="pt-3 text-lg text-blue-600 font-semibold">
                      Price: {course?.price} ₹
                    </p>

                    <div className="flex justify-between items-center">
                      {course.averageRating > 0 && (
                        <div className="flex justify-center items-center">
                          <p className="font-medium text-base text-black-800">
                            {course.averageRating}
                          </p>
                          <div className="text-lg text-amber-500"> ★ </div>
                          <div className="text-base text-black">rating</div>
                        </div>
                      )}
                      <div className="text-base font-medium text-blue-800">
                        {course?.videos.length} videos
                      </div>
                      {userInfo && (
                        <div className="text-sm">
                          {" "}
                          <HeartComponent courseId={course._id} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default HomePage;

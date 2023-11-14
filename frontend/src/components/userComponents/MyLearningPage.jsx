import axios from "axios";
import React, { useEffect, useState } from "react";
import { getMyCoursesUrl } from "../../url";

const MyLearningPage = () => {
  const [courses, setcourses] = useState([]);

  const fetchdata = async () => {
    try {
      const { data } = await axios.get(getMyCoursesUrl, {
        withCredentials: true,
      });

      setcourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      <div className="text-2xl font-semibold font-serif text-slate-800 mt-10 flex justify-center">
        My Courses
      </div>
      <div className="grid grid-cols-1 gap-4 mb-10 mt-10">
        {courses.map((order) => (
          <div key={order._id} className="flex justify-evenly ">
            {order.purchasedCourses.map((myCourse) => (
              <div key={myCourse.courseId._id} className=" mb-4">
                <div className="p-4 shadow-md w-full">
                  <div className="flex flex-col justify-center items-center">
                    <img
                      src={myCourse.courseId.thumbnail}
                      alt="course thumbnail"
                      className="w-40 h-40"
                    />
                    <div className="px-4">
                      <div className="text-lg text-green-600 font-semibold">
                        {myCourse.courseId.courseName}
                      </div>
                      <div className="text-base font-medium">
                        Tutor: {myCourse.courseId.tutorId.name.toUpperCase()}
                      </div>
                      <div className="text-base font-medium">
                        Created On:{" "}
                        {new Date(myCourse.courseId.createdAt).toDateString()}
                      </div>
                      <div>
                        <span className="text-sm font-semibold">
                          {myCourse.courseId.videos.length} videos
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default MyLearningPage;

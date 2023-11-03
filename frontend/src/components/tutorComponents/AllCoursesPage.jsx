import axios from "axios";
import React, { useEffect, useState } from "react";
import { getCoursesUrl } from "../../url.js";
import { ImBin2 } from "react-icons/im";
import { Link } from "react-router-dom";

const AllCoursesPage = () => {
  const [courses, setCourses] = useState([]);

  const getCourse = async () => {
    try {
      const res = await axios.get(getCoursesUrl, {
        withCredentials: true,
      });
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <div>
      {courses.length > 0 ? (
        <div className="ml-6">
          <div className="text-2xl font-bold mb-4">My Courses</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {courses.map((course) => (
              <div key={course.id} className="bg-gray-50 p-4 rounded shadow-lg">
                <div className="flex mb-4">
                  <div className="w-1/4 bg-slate-50 h-50">
                    <img src={course.thumbnail} alt="thumbnail" className="" />
                    <div className="text-sm mt-1">{course.caption}</div>
                  </div>
                  <div className="w-3/4 pl-4">
                    <div className="font-bold mb-2">{course.courseName}</div>
                    <p>{course.description}</p>
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-2">Course Details</div>
                  <div className="text-sm">
                    <p>Price: {course.price}</p>
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-2">Course Videos</div>
                  <div className="mt-1">
                    {course?.videos.map((video, index) => (
                      <a
                        href={video.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                      >
                        <div className="bg-white mt-1 p-4 rounded shadow-lg hover:translate-y-1 hover:translate-x-2 hover:bg-white flex justify-between items-center">
                          {video.videoName}
                          <div className="">
                            <ImBin2 />
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen justify-center items-center">
          {" "}
          <div className="w-60 h-60">
            <img
              src="https://s.udemycdn.com/teaching/support-1-v3.jpg"
              alt="Right Image"
            />
          </div>
          <div className="text-4xl font-serif">Let's Create a Course</div>
          <div className="mt-4">
            <Link to="/tutor/add-course">
              <button className="bg-gray-950 text-white hover:bg-gray-300 hover:text-slate-950 hover:font-bold px-4 py-2 border-black">
                Click Here
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCoursesPage;

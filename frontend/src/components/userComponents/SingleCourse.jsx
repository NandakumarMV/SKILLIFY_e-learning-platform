import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setCourses } from "../../slices/courseDetailsSlice";
import axios from "axios";
import { getApprovedAllCouresesUrl } from "../../url";
import { RiFolderVideoLine } from "react-icons/ri";
import { useGetCourseMutation } from "../../slices/userApiSlice";

const SingleCourse = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const [getcourse] = useGetCourseMutation();
  console.log(courseId);

  const CourseData = async () => {
    const res = await getcourse(courseId).unwrap();
    dispatch(setCourses(res));
    console.log(res, "fffffffffff");
  };

  useEffect(() => {
    CourseData();
  }, []);
  const courses = useSelector((state) => state.courses.courses);
  const course = courses?.course;
  console.log(courses.purchased, "hhhhhhhhhhhhhh");

  return (
    <div className="mb-5 overflow-hidden">
      <div className="bg-slate-600 w-screen mb-4  justify-center items-center flex">
        <div className=" pr-2">
          <img className="w-40 h-40" src={course?.thumbnail} alt="thumbnail" />
        </div>
        <div className="w-5/12 pt-6">
          <p className="font-extrabold text-xl text-white  p-2">
            {course?.courseName}
          </p>
          <p className="font-semibold text-base text-white  p-2">
            {" "}
            {course?.caption}
          </p>
          <p className="font-semibold text-base text-white  p-2">
            Instructor: {course?.tutorId?.name.toUpperCase()}
          </p>{" "}
          <p className="font-medium text-base text-white  p-2">
            Created On: {new Date(course?.createdAt).toDateString()}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-1/2 p-2 border-2">
          <div className=" bg-slate-50">
            <h4 className="text-blue-800 text-lg font-semibold">Description</h4>
            <div className=" leading-loose">{course?.description}</div>
          </div>
          <div className=" mt-5 mb-5 bg-slate-50 ">
            <h4 className="text-blue-800 text-lg font-semibold">
              Requirements
            </h4>
            {course?.requiredSkills ? (
              <div className=" leading-loose">{course?.requiredSkills}</div>
            ) : (
              "No additional requirements"
            )}
          </div>
        </div>
        <div className="mt-5 ml-3">
          <div className=" border-[2px] p-3">
            <div className="flex justify-center items-center">
              Preview Video
            </div>
            <video width="220" height="140" controls>
              <source src={course?.previewVideo} type="video/mp4" />
            </video>
          </div>

          <div className="p-5 border-2 mt-2">
            <div className="text-lg p-2 font-semibold"> Course Videos</div>
            <span className="text-sm text-slate-400 ">
              Purchase to access videos
            </span>
            {course?.videos?.map((video) => (
              <div key={video.videoUniqueId}>
                <div className="bg-slate-50 mt-1 p-4 rounded shadow-lg hover:translate-y-1 hover:translate-x-2 hover:bg-white flex justify-between items-center">
                  {" "}
                  {video.videoName}
                  <div className="pl-2">
                    <RiFolderVideoLine />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mb-5 mt-10 ">
        <div className="  bg-slate-50 h-16 w-1/2 m-2 flex items-center justify-evenly shadow-lg">
          <p className="text-gray-600 tracking-wider text-xl font-extrabold">
            Price:{course?.price}
          </p>{" "}
        </div>
      </div>
      {!courses.purchased && (
        <div className=" flex justify-center items-center">
          <Link to={`/order/${course?._id}`}>
            <button className="bg-green-600 text-white text-lg font-semibold p-2 hover:bg-green-700 w-44 drop-shadow-lg">
              Purchase
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}; 

export default SingleCourse;

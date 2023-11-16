import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setCourses } from "../../slices/courseDetailsSlice";
import axios from "axios";
import { getApprovedAllCouresesUrl } from "../../url";
import { IoMdChatboxes } from "react-icons/io";
import { RiFolderVideoLine } from "react-icons/ri";
import {
  useCourseRatingMutation,
  useCourseRevewMutation,
  useGetCourseMutation,
  useTrackVideoMutation,
} from "../../slices/userApiSlice";
import FeedbackModal from "./FeedbackModal";

const SingleCourse = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const [getcourse] = useGetCourseMutation();
  const [courseRating] = useCourseRatingMutation();
  console.log(courseId);
  const [rating, setRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStarClick = async (clickedRating) => {
    console.log(clickedRating, "click rating");
    setRating(clickedRating);
    console.log(rating, "rating");
    const res = await courseRating({ courseId, clickedRating }).unwrap();
    dispatch(setCourses(res));
  };

  const CourseData = async () => {
    const res = await getcourse(courseId).unwrap();
    dispatch(setCourses(res));
    console.log(res, "fffffffffff");
  };

  useEffect(() => {
    CourseData();
  }, []);
  const courses = useSelector((state) => state.courses.courses);
  const userId = useSelector((state) => state.auth.userInfo._id);
  const course = courses?.course;

  const [viewedVideos, setViewedVideos] = useState([]);
  const [videoTrack] = useTrackVideoMutation();

  const handleVideoClick = async (videoId, courseId) => {
    const res = await videoTrack({ videoId, courseId }).unwrap();

    const actions = dispatch(setCourses(res));
    if (actions) {
      if (!viewedVideos.includes(videoId)) {
        setViewedVideos((prevViewedVideos) => [...prevViewedVideos, videoId]);
      }
    }
  };

  const isRated = course?.rating.some((rate) => rate.userId._id === userId);
  console.log(course?.rating);
  console.log(userId);
  console.log(isRated, "sdhfsadjkfh");

  const [coursefeedback] = useCourseRevewMutation();

  const handleFeedbackSubmit = async (feedback) => {
    console.log("Feedback submitted:", feedback);

    const res = await coursefeedback({ feedback, courseId }).unwrap();
    dispatch(setCourses(res));
  };
  return (
    <>
      <div className="mb-5 overflow-hidden">
        <div className="bg-slate-600 w-screen mb-4  justify-center items-center flex">
          <div className=" pr-2">
            <img
              className="w-40 h-40"
              src={course?.thumbnail}
              alt="thumbnail"
            />
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
              Instructor:{" "}
              {course?.tutorId && course?.tutorId?.name?.toUpperCase()}
            </p>{" "}
            <p className="font-medium text-base text-white  p-2">
              Created On: {new Date(course?.createdAt).toDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-1/2">
            <div className=" p-2 border-2">
              <div className=" bg-slate-50">
                <h4 className="text-blue-800 text-lg font-semibold">
                  Description
                </h4>
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
              {/* */}
            </div>
            <div className=" bg-slate-50  p-3 w-auto mt-5">
              {" "}
              <div className="text-lg ">Instructor </div>
              <div className="flex">
                <img
                  className="w-24 h-24"
                  src={course?.tutorId.tutorImageUrl}
                  alt={course?.tutorId.name}
                />

                <div className="p-2">
                  <p className="text-lg font-medium">
                    {course?.tutorId && course?.tutorId?.name?.toUpperCase()}
                  </p>
                  <p className="font-bold">{course?.tutorId.email}</p>
                  <p className="text-base font-normal">
                    {course?.tutorId.about}
                  </p>
                  {courses?.purchased && (
                    <div className="flex text-base font-medium items-end justify-start pt-1 ">
                      <div className="text-2xl">
                        <IoMdChatboxes />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {courses.purchased && (
              <>
                <div
                  onClick={() => setIsModalOpen(true)}
                  className="border-2 border-gray-700 p-2 w-1/4 mt-3"
                >
                  <div> Give a Feedback !</div>
                </div>
                <FeedbackModal
                  isOpen={isModalOpen}
                  onRequestClose={() => setIsModalOpen(false)}
                  onSubmit={handleFeedbackSubmit}
                />
              </>
            )}
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
              <div className="text-lg p-1 font-semibold"> Course Videos</div>
              {courses.purchased ? (
                <div className="text-blue-700 p-1 font-semibold">
                  {" "}
                  Start Watching
                </div>
              ) : (
                <div className="text-red-700 p-1 font-semibold">
                  Purchase to watch
                </div>
              )}
              {courses.purchased
                ? course?.videos?.map((video, index) => (
                    <div key={video.videoUniqueId}>
                      <div className="bg-slate-50 mt-1 p-4 rounded shadow-lg hover:translate-y-1 hover:translate-x-2 hover:bg-white flex justify-between items-center">
                        <a
                          href={video.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          key={index}
                          onClick={() =>
                            handleVideoClick(video.videoUniqueId, course?._id)
                          }
                        >
                          <div
                            className={
                              viewedVideos.includes(video.videoUniqueId) ||
                              video.viewers.some(
                                (viewer) => viewer.userId === userId
                              )
                                ? "text-green-500"
                                : ""
                            }
                          >
                            {video.videoName}
                          </div>
                        </a>
                        <div className="ml-auto">
                          <RiFolderVideoLine />
                        </div>
                      </div>
                    </div>
                  ))
                : course?.videos?.map((video) => (
                    <div key={video.videoUniqueId}>
                      <div className="bg-slate-50 mt-1 p-4 rounded shadow-lg hover:translate-y-1 hover:translate-x-2 hover:bg-white flex justify-between items-center">
                        {video.videoName}
                        <div className="ml-auto">
                          <RiFolderVideoLine />
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
        {!courses.purchased && (
          <>
            <div className="flex justify-center items-center mb-5 mt-10 ">
              <div className="  bg-slate-50 h-16 w-1/2 m-2 flex items-center justify-evenly shadow-lg">
                <p className="text-gray-600 tracking-wider text-xl font-extrabold">
                  Price:{course?.price}
                </p>{" "}
              </div>
            </div>

            <div className=" flex justify-center items-center">
              <Link to={`/order/${course?._id}`}>
                <button className="bg-green-600 text-white text-lg font-semibold p-2 hover:bg-green-700 w-44 drop-shadow-lg">
                  Purchase
                </button>
              </Link>
            </div>
          </>
        )}
        <div className="flex justify-center items-center  mt-10 bg-gray-300">
          <div>
            <div className="text-lg font-serif font-medium flex justify-center items-center ">
              Course Reviews
            </div>
            <div className=" flex flex-wrap">
              {course?.reviews.map((r, index) => (
                <div key={index} className=" p-4 border-x-2">
                  <div>{r.review}</div>
                  <div className="font-medium text-xs">{r.userId.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {courses.purchased && !isRated && (
        <div className="  bg-slate-100 flex  justify-center items-center text-lg">
          {" "}
          <div className="pr-3">Rate The Course</div>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((index) => (
              <button
                key={index}
                onClick={() => handleStarClick(index)}
                className={`text-2xl ${
                  index <= rating ? "text-yellow-500" : "text-gray-300"
                } focus:outline-none`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SingleCourse;

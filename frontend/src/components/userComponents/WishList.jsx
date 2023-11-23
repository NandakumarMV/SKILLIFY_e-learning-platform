import React, { useEffect, useState } from "react";
import {
  useAddWishlistMutation,
  useDeleteFromWishlistMutation,
  useGetAllWishlistMutation,
} from "../../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist } from "../../slices/courseDetailsSlice";
import { Link } from "react-router-dom";
import HeartComponent from "./Heartcomponent";
import { FaHeart } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";

const WishList = () => {
  const [addtowishlist] = useAddWishlistMutation();
  const [deleteFromWishlist] = useDeleteFromWishlistMutation();

  const dispatch = useDispatch();
  const [getAllWishlist] = useGetAllWishlistMutation();

  const [isIncluded, setIsIncluded] = useState(true);
  const [courseInclusion, setCourseInclusion] = useState({});
  const wishlistgetting = async () => {
    const res = await getAllWishlist().unwrap();
    const inclusionStatus = res.reduce((acc, course) => {
      acc[course.course._id] = true;
      return acc;
    }, {});
    setCourseInclusion(inclusionStatus);
    await dispatch(addWishlist(res));
  };

  useEffect(() => {
    wishlistgetting();
  }, []);
  const wishlistCourses = useSelector((state) => state.courses.wishlist);

  const handleToggleWishlist = async (courseId) => {
    const res = await deleteFromWishlist({ courseId });
    dispatch(addWishlist(res.data));
    wishlistgetting();
  };
  return (
    <div>
      <div className="h-6"></div>
      <div className="flex justify-center items-center font-serif text-2xl text-blue-600 tracking-wider">
        Wishlist
      </div>
      <div className="h-6"></div>
      <div className="">
        {wishlistCourses ? (
          <div className="flex flex-wrap justify-evenly items-center">
            {wishlistCourses.map((course) => (
              <div key={course.course._id}>
                <Link to={`/course/${course.course._id}`}>
                  <div className=" mb-4 hover:shadow-2xl">
                    <div className="p-4 shadow-md w-full">
                      <div className="flex flex-col justify-center items-center">
                        <img
                          src={course.course.thumbnail}
                          alt="course thumbnail"
                          className="w-40 h-40"
                        />
                        <div className="px-4">
                          <div className="text-lg text-green-600 font-semibold">
                            {course.course.courseName}
                          </div>
                          <div className="text-base font-medium">
                            Tutor: {course?.course?.tutorId?.name.toUpperCase()}
                          </div>
                          <div className="text-base font-medium">
                            Created On:{" "}
                            {new Date(course.course.createdAt).toDateString()}
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-sm font-semibold">
                              {course?.course?.videos?.length} videos
                            </span>
                            <div className="text-sm">
                              {" "}
                              <div className="flex items-center">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleToggleWishlist(course.course._id);
                                  }}
                                  className={`text-2xl cursor-pointer ${
                                    courseInclusion[course.course._id]
                                      ? "text-black"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {courseInclusion[course.course._id] ? (
                                    <FaHeart />
                                  ) : (
                                    <FiHeart />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col mt-6 justify-center items-center">
            {" "}
            <div className="w-80 h-80">
              <img
                src="https://i.pinimg.com/564x/e0/fa/9e/e0fa9e12a918dc11792cd678a881a7a9.jpg"
                alt="Right Image"
              />
            </div>
            <div className="text-4xl font-serif">
              Let's Learn! Let's Ignite!
            </div>
            <div className="text-xl font-serif underline underline-offset-4 p-3 text-blue-700 hover:text-2xl">
              <Link>Find courses</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;

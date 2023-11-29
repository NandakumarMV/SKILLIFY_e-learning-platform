import React, { useEffect, useState } from "react";
import {
  useAddWishlistMutation,
  useDeleteFromWishlistMutation,
  useGetAllWishlistMutation,
} from "../../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist } from "../../slices/courseDetailsSlice";
import { Link, useNavigate } from "react-router-dom";
import HeartComponent from "./Heartcomponent";
import { FaHeart } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { logout } from "../../slices/userAuthSlice";

const WishList = () => {
  const [addtowishlist] = useAddWishlistMutation();
  const [deleteFromWishlist] = useDeleteFromWishlistMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getAllWishlist] = useGetAllWishlistMutation();

  const [isIncluded, setIsIncluded] = useState(true);
  const [courseInclusion, setCourseInclusion] = useState({});
  const wishlistgetting = async () => {
    try {
      const res = await getAllWishlist().unwrap();
      const inclusionStatus = res.reduce((acc, course) => {
        acc[course.course._id] = true;
        return acc;
      }, {});
      setCourseInclusion(inclusionStatus);
      await dispatch(addWishlist(res));
    } catch (error) {
      if (error.status === 403) {
        dispatch(logout());
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    wishlistgetting();
  }, []);
  const wishlistCourses = useSelector((state) => state.courses.wishlist);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 3;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = wishlistCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
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
        {wishlistCourses && wishlistCourses?.length > 0 ? (
          <>
            <div className="flex flex-wrap justify-evenly items-center">
              {currentCourses.map((course) => (
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
                              Tutor:{" "}
                              {course?.course?.tutorId?.name.toUpperCase()}
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
            <div className="flex justify-center mb-3">
              <div className="flex mt-4">
                {[
                  ...Array(Math.ceil(wishlistCourses.length / coursesPerPage)),
                ].map((page, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-2 mx-1 ${
                      currentPage === index + 1
                        ? "bg-gray-800 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </>
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
              <Link to="/courses">Find courses</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;

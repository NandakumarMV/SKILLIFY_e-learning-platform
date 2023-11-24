import React, { useEffect, useState } from "react";
import { setCourses } from "../../slices/courseDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getApprovedAllCouresesUrl, getalldoamins } from "../../url";
import { setDomains } from "../../slices/domainSlice";
import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const CoursesViewPage = () => {
  const dispatch = useDispatch();
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedRatingRange, setSelectedRatingRange] = useState("all");
  const [search, setSearch] = useState("");

  const handlePriceChange = (event) => {
    const priceRange = event.target.value;
    setSelectedPriceRange(priceRange);
  };

  const handleRatingChange = (event) => {
    const ratingRange = event.target.value;
    setSelectedRatingRange(ratingRange);
  };

  // const handleSearch = (event) => {
  //   const searchTerm = event.target.value;
  //   setSearch(searchTerm);
  // };

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
  const searchquery = useSelector((state) => state.courses.searchQuery);
  console.log(searchquery, "search aurefrf");

  useEffect(() => {
    if (searchquery.length > 0) {
      setSearch(searchquery);
    }
  }, [searchquery]);
  console.log(search, "value of search");
  const filterCourse = Array.isArray(courses)
    ? courses.filter((course) => {
        const domainFilter = domains.map(
          (domain) => course.domain.domainName === domain
        );
        const priceFilter =
          selectedPriceRange === "all" ||
          (course.price >= Number(selectedPriceRange.split("-")[0]) &&
            course.price <= Number(selectedPriceRange.split("-")[1]));

        const ratingFilter =
          selectedRatingRange === "all" ||
          (course.averageRating >= Number(selectedRatingRange.split("-")[0]) &&
            course.averageRating <= Number(selectedRatingRange.split("-")[1]));

        const searchFilter =
          search === "" ||
          course.courseName.toLowerCase().includes(search.toLowerCase());

        return (
          domainFilter.includes(true) &&
          priceFilter &&
          ratingFilter &&
          searchFilter
        );
      })
    : [];

  const filteredDomains = domains.filter((domain) =>
    domain.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="left-4 relative">
      <div className="h-8 "></div>
      <div
        className="flex justify-start items-center bg-slate-100
      "
      >
        <div className=" text-2xl font-serif flex justify-start w-1/2 p-1">
          Courses
        </div>
        {/* <div className="flex ">
          <div className=" mx-auto ">
            <div className="relative text-gray-600 focus-within:text-gray-400 w-full flex items-center">
              <div className="absolute left-2 text-lg">
                <IoSearchSharp />
              </div>
              <input
                type="search"
                name="search"
                value={search}
                onChange={handleSearch}
                className="py-2 text-sm text-black border-b border-gray-300 pl-10 focus:outline-none focus:border-b focus:border-black w-full"
                placeholder="Search..."
                autoComplete="off"
              />
            </div>
          </div>
        </div> */}
      </div>
      <div className="flex justify-center  ">
        <div className="w-full ">
          {filteredDomains.map((domain, index) => (
            <div key={index} className=" ">
              <div className="mt-4  p-4   flex flex-col justify-start">
                <h2 className="text-lg text-green-700 font-medium">{domain}</h2>
                {filterCourse.length > 0 ? (
                  filterCourse?.map((course) => {
                    if (course.domain.domainName === domain) {
                      return (
                        <>
                          <div className="h-5"></div>
                          <Link to={`/course/${course._id}`}>
                            <div className="flex w-full border-y-2 border-gray-400 justify-between p-4">
                              <div className="flex">
                                <img
                                  src={course?.thumbnail}
                                  alt="course thumbnail"
                                  className="w-24 h-24"
                                />
                                <div className="px-4 ">
                                  <div className="text-lg text-green-600 font-semibold">
                                    {course?.courseName}
                                  </div>
                                  <div className="text-base font-medium line-clamp-3">
                                    {course?.caption}
                                  </div>
                                  <div className="text-base font-medium text-blue-700 truncate">
                                    By: {course?.tutorId?.name.toUpperCase()}
                                  </div>
                                  <div className="text-base font-medium">
                                    <p>
                                      Created On:{" "}
                                      {new Date(
                                        course?.createdAt
                                      ).toDateString()}
                                    </p>
                                  </div>
                                  {course?.averageRating > 0 ? (
                                    <div className=" flex justify-between items-center ">
                                      <div className=" flex justify-center items-center">
                                        <p className="  font-medium text-base text-black-800">
                                          {course?.averageRating}
                                        </p>
                                        <div className="text-lg text-amber-500">
                                          {" "}
                                          ★{" "}
                                        </div>
                                        <div className="text-base text-black">
                                          rating
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  <div className="text-base font-medium  text-blue-800 ">
                                    {course?.videos.length} videos
                                  </div>
                                </div>
                              </div>
                              <div className="text-lg text-violet-600 font-medium mt-2  ">
                                <p>Price: ₹ {course?.price}.00 </p>
                              </div>
                            </div>
                          </Link>
                        </>
                      );
                    }
                    return null;
                  })
                ) : (
                  <div>No Course Available</div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className=" p-4 w-[50%] flex ">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Filter by Price</h2>
            <div className="flex flex-col space-y-2  ">
              <label className="text-lg">
                <input
                  type="radio"
                  name="priceRange"
                  value="all"
                  checked={selectedPriceRange === "all"}
                  onChange={handlePriceChange}
                  className="mr-2"
                />
                All Prices
              </label>
              <label className="text-lg">
                <input
                  type="radio"
                  name="priceRange"
                  value="1000 - 1500"
                  checked={selectedPriceRange === "1000 - 1500"}
                  onChange={handlePriceChange}
                  className="mr-2 "
                />
                1000 - 1500
              </label>
              <label className="text-lg">
                <input
                  type="radio"
                  name="priceRange"
                  value="1501 - 2000"
                  checked={selectedPriceRange === "1501 - 2000"}
                  onChange={handlePriceChange}
                  className="mr-2"
                />
                1500 - 2000
              </label>
              <label className="text-lg">
                <input
                  type="radio"
                  name="priceRange"
                  value="2001 - 3000"
                  checked={selectedPriceRange === "2001 - 3000"}
                  onChange={handlePriceChange}
                  className="mr-2"
                />
                2000 - 3000
              </label>
            </div>
            <div className="h-8 "></div>
            <h2 className="text-xl font-semibold mb-3">Filter by Rating</h2>
            <div className="flex flex-col space-y-2  ">
              <label className="text-lg">
                <input
                  type="radio"
                  name="ratingRange"
                  value="all"
                  checked={selectedRatingRange === "all"}
                  onChange={handleRatingChange}
                  className="mr-2"
                />
                All Ratings
              </label>
              <label className="text-lg">
                <input
                  type="radio"
                  name="ratingRange"
                  value="3 - 3.5"
                  checked={selectedRatingRange === "3 - 3.5"}
                  onChange={handleRatingChange}
                  className="mr-2 "
                />
                3 - 3.5 ★
              </label>
              <label className="text-lg">
                <input
                  type="radio"
                  name="ratingRange"
                  value="3.6 - 4"
                  checked={selectedRatingRange === "3.6 - 4"}
                  onChange={handleRatingChange}
                  className="mr-2"
                />
                3.5 - 4 ★
              </label>
              <label className="text-lg">
                <input
                  type="radio"
                  name="ratingRange"
                  value="4.1 - 5"
                  checked={selectedRatingRange === "4.1 - 5"}
                  onChange={handleRatingChange}
                  className="mr-2"
                />
                4 - 5 ★
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesViewPage;

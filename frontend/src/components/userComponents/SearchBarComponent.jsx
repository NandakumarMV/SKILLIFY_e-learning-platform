import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addToSeacrhQuery, setCourses } from "../../slices/courseDetailsSlice";
import { useNavigate } from "react-router-dom";

const SearchBarComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector((state) => state.courses.courses);
  if (courses?.length > 0) {
  }
  // const courseNames = courses?.map((course) => course.courseName) || [];

  const domains = useSelector((state) => state.domains.domains);

  console.log(domains, "doamins");
  console.log(courses);

  useEffect(() => {
    const suggest = [...domains];
    console.log(suggest, "suggest");
    if (searchTerm && searchTerm.trim() !== "") {
      const filteredSuggestions = suggest.filter((courseName) =>
        courseName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);
  const handleSuggestionClick = async (selectedSuggestion) => {
    dispatch(addToSeacrhQuery(selectedSuggestion));
    navigate("/courses");
  };
  return (
    <div className="relative z-40">
      <div className="relative">
        <div className="absolute bottom-2 left-2 text-lg">
          <IoSearchSharp />
        </div>
        <input
          type="search"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="py-2 text-sm text-black border-[1px] rounded-2xl border-gray-300 pl-10 focus:outline-none focus:border-[1px] w-64 focus:border-gray-700"
          placeholder="Search..."
          autoComplete="off"
        />
      </div>
      {/* Render your filtered suggestions */}
      {suggestions.length > 0 && (
        <div className="absolute top-10 left-0 w-64 bg-white border border-gray-300 rounded shadow">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBarComponent;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDomains } from "../../slices/domainSlice";
import axios from "axios";

import { setCourses } from "../../slices/courseDetailsSlice";
import { useAddCourseMutation } from "../../slices/tutorApiSlice";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [domainName, setDomainName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [requiredSkill, setRequiredSkill] = useState("");
  const [price, setPrice] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addCourse] = useAddCourseMutation();
  const getDomain = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/domains", {
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
  const domains = useSelector((state) => state.domains.domains);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await addCourse({
        domainName,
        courseName,
        description,
        price,
        requiredSkill,
      }).unwrap();
      dispatch(
        setCourses({
          ...res,
        })
      );
      navigate("/tutor/add-videos");
    } catch (err) {}
  };
  return (
    <div className="w-screen mt-7 h-screen flex justify-center items-center">
      <div className="flex w-screen justify-center items-center gap-4">
        <div className="w-60 h-60">
          <img
            src="https://s.udemycdn.com/teaching/plan-your-curriculum-v3.jpg"
            alt="Left Image"
          />
        </div>
        <form onSubmit={submitHandler}>
          <div className="w-96 p-4">
            <div className="text-2xl mb-3 flex justify-center font-serif">
              Create your Course
            </div>
            <div className="mb-4">
              <label
                htmlFor="domain"
                className="block text-blue-900 font-semibold mb-2"
              >
                Choose the Domain
              </label>
              <select
                id="domain"
                name="domain"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                className="w-full border border-gray-600 px-3 py-2"
              >
                <option value="">Select Domain</option>
                {domains.map((domain, index) => (
                  <option key={index} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="courseName"
                className="block text-blue-900 font-semibold"
              >
                Name Of the Course
              </label>
              <input
                type="text"
                id="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                name="courseName"
                className="w-full border border-gray-600 px-3 py-2"
                placeholder="Enter the course name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Description"
                className="block text-blue-900 font-semibold"
              >
                Description for the Course
              </label>
              <textarea
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                className="w-full border border-gray-600 px-3 py-2"
                placeholder="Description..."
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="requiredSkill"
                className="block text-blue-900 font-semibold"
              >
                Required Skills for the course
              </label>
              <textarea
                type="text"
                id="requiredSkill"
                value={requiredSkill}
                onChange={(e) => setRequiredSkill(e.target.value)}
                name="requiredSkill"
                className="w-full border border-gray-600 px-3 py-2"
                placeholder="Required Skill..."
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-blue-900 font-semibold"
              >
                Subscription Fee
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                name="courseName"
                className="w-full border border-gray-600 px-3 py-2"
                placeholder="Price"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-60 bg-black text-white py-2 px-4 hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-300"
              >
                Create
              </button>
            </div>
          </div>
        </form>

        <div className="w-60 h-60">
          <img
            src="https://s.udemycdn.com/teaching/support-1-v3.jpg"
            alt="Right Image"
          />
        </div>
      </div>
    </div>
  );
};

export default AddCourse;

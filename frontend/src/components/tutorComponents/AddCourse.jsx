import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDomains } from "../../slices/domainSlice";
import axios from "axios";
import { AiFillPlusCircle } from "react-icons/ai";
import { addVideoToCourse, setCourses } from "../../slices/courseDetailsSlice";
import {
  useAddCourseMutation,
  useAddVideoMutation,
} from "../../slices/tutorApiSlice";
import { Link, useNavigate } from "react-router-dom";

import Loader from "../Loader";

const AddCourse = () => {
  const [domainName, setDomainName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [requiredSkill, setRequiredSkill] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addCourse] = useAddCourseMutation();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

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
      const formData = new FormData();
      formData.append("domain", domainName);
      formData.append("courseName", courseName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("requiredSkill", requiredSkill);
      formData.append("caption", caption);
      formData.append("image", image);

      const res = await addCourse(formData).unwrap();
      dispatch(
        setCourses({
          ...res,
        })
      );
    } catch (err) {}
  };

  const [video, setVideo] = useState(null);
  const [videoName, setVideoName] = useState("");
  const course = useSelector((state) => state.courses);
  console.log(course.courses._id);
  const courseId = course.courses._id;
  const courseinfo = course.courses;

  const [addVideos, { isLoading }] = useAddVideoMutation();

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };
  const handleclick = () => {
    navigate("/tutor/courses");
    window.location.reload();
  };
  const submitVideoHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("video", video);
      formData.append("videoName", videoName);
      formData.append("courseId", courseId);

      const res = await addVideos(formData).unwrap();

      const resId = res.courseId;
      const resVideo = {
        videoName: videoName,
        videoUrl: res.url,
      };

      dispatch(addVideoToCourse({ video: resVideo }));
    } catch (error) {}
  };
  const videos = useSelector((state) => state.courses.videos);

  console.log(videos, "viddddddd");

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : courseId ? (
        <div className="mt-7 ">
          <div className="text-2xl font-serif justify-center  items-center flex">
            Upload Videos for {courseinfo.courseName.toUpperCase()}
          </div>

          <div className=" inset-0 flex items-center mt-7 justify-center ">
            <div className=" bg-white w-96 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Upload Video</h2>
              <form onSubmit={submitVideoHandler} encType="multipart/form-data">
                <input type="hidden" name="courseId" value={courseId} />
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  name="video"
                  className="mb-4 p-2 w-full border rounded"
                />

                <input
                  type="text"
                  value={videoName}
                  onChange={(e) => setVideoName(e.target.value)}
                  placeholder="Enter video name"
                  className="mb-4 p-2 w-full border rounded border-black"
                  rows="4"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-gray-950 text-white hover:bg-gray-300 hover:text-slate-950 hover:font-bold px-4 py-2 rounded border-black"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
          {videos.length > 0 ? (
            <div className=" mt-5 mb-5">
              <h2 className="font-serif flex justify-center items-center text-xl">
                Videos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center ml-7 mt-8">
                {videos.map((video, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white rounded shadow-lg text-center"
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {video.videoName}
                    </h3>
                    <video width="320" height="240" controls>
                      <source src={video.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <button
                  className="bg-gray-950 text-white hover:bg-gray-300 hover:text-slate-950 hover:font-bold px-4 py-2  border-black"
                  onClick={handleclick}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="w-screen mt-7 flex flex-col justify-center items-center">
          <div className="flex w-screen justify-center items-center gap-4">
            <div className="w-60 h-60">
              <img
                src="https://s.udemycdn.com/teaching/plan-your-curriculum-v3.jpg"
                alt="Left Image"
              />
            </div>
            <form onSubmit={submitHandler} encType="multipart/form-data">
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
                </div>{" "}
                <div className="mb-4">
                  <label
                    htmlFor="thumbnail image"
                    className="block text-blue-900 font-semibold"
                  >
                    Thumbnail Image
                  </label>
                  <div>
                    <label
                      htmlFor="image"
                      className="text-black cursor-pointer text-sm"
                    >
                      <AiFillPlusCircle className="text-black inline-block" />
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        className="hidden"
                        name="image"
                        onChange={handleImageChange}
                      />
                      Add Thumbnail
                    </label>
                  </div>
                  {image && (
                    <div>
                      <img
                        src={URL.createObjectURL(image)}
                        alt="thumbnail"
                        name="image"
                        className="w-40 h-40 border-gray-700 mx-auto shadow-xl inline-block"
                      />
                      <input
                        type="text"
                        placeholder="Image Caption"
                        value={caption}
                        name="caption"
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-40 border border-gray-600 px-3 py-2 mt-2"
                      />
                    </div>
                  )}
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
      )}
    </>
  );
};

export default AddCourse;

import React, { useEffect, useState } from "react";
import { useUpdateTutorProfileMutation } from "../../slices/tutorApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setTutorCredentials } from "../../slices/tutorAuthSlice";
import { BiSolidEdit } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

const TutorProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");
  const [about, setAbout] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { tutorInfo } = useSelector((state) => state.tutorAuth);
  const [updateTutorProfile] = useUpdateTutorProfileMutation();

  useEffect(() => {
    setName(tutorInfo.name);
    setEmail(tutorInfo.email);
    setQualifications(tutorInfo.qualifications);
    setExperience(tutorInfo.experience);
    setAbout(tutorInfo.about);
  }, [
    tutorInfo.name,
    tutorInfo.email,
    tutorInfo.qualifications,
    tutorInfo.experience,
    tutorInfo.about,
  ]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const sumbmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("image", image);
      formData.append("_id", tutorInfo._id);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("qualifications", qualifications);
      formData.append("about", about);
      formData.append("experience", experience);

      const res = await updateTutorProfile(formData).unwrap("");

      dispatch(setTutorCredentials({ ...res }));

      setSuccess("Profile Updated");
    } catch (error) {
      setError(error?.data?.message || error.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="mb-36">
        <div className="text-black text-center mb-4 text-2xl font-semibold">
          PROFILE
        </div>
        <form
          className="p-6 w-96"
          onSubmit={sumbmitHandler}
          encType="multipart/form-data"
        >
          <div className="mb-4">
            <div className="text-center">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="User Profile"
                  className="w-40 h-40  border-gray-700  mx-auto shadow-xl inline-block"
                />
              ) : tutorInfo.image ? (
                <img
                  src={tutorInfo.image}
                  alt={tutorInfo.name}
                  className="w-40 h-40   mx-auto shadow-xl inline-block"
                />
              ) : (
                <FaUserCircle className="w-40 h-40  border-gray-700  mx-auto shadow-xl inline-block" />
              )}
              <label htmlFor="image" className="text-black cursor-pointer">
                <BiSolidEdit className="text-black inline-block" />
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  className="hidden"
                  name="image"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-blue-900 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name?.toUpperCase()}
              onChange={(e) => setName(e.target.value)}
              name="name"
              className="w-full border border-gray-600 px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-blue-900 font-semibold"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              className="w-full border border-gray-600 px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="qualifications"
              className="block text-blue-900- font-semibold"
            >
              Highest Qualifications
            </label>
            <select
              id="qualifications"
              name="qualifications"
              value={qualifications}
              onChange={(e) => setQualifications(e.target.value)}
              className="w-full border border-gray-600 px-3 py-2"
            >
              <option value="">Select Qualifications</option>
              <option value="Bachelors">Bachelor's degree</option>
              <option value="Masters">Masters</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="about"
              className="block text-blue-900 font-semibold"
            >
              About
            </label>
            <textarea
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              name="about"
              placeholder="Write about you"
              className="w-full border border-gray-600 px-3 py-2"
              style={{ width: "100%", minHeight: "150px" }}
            />
          </div>

          {/* <div className="mb-4">
            <label
              htmlFor="uploadqualifications"
              className="block text-blue-900- font-semibold"
            >
              Upload Qualifications (PDF only)
            </label>
            <input
              type="file"
              id="qualificationsPdf"
              name="qualificationsPdf"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full border border-gray-600 px-3 py-2"
            />
          </div> */}
          <div className="mb-4">
            <label
              htmlFor="experience"
              className="block text-blue-900- font-semibold"
            >
              Work Experience
            </label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full border border-gray-600  px-3 py-2"
              placeholder="Explain about our Experience"
            />
          </div>
          <div>
            <span className="text-red-600 text-sm">
              {error === "email already exists" && error}
            </span>
          </div>
          <div className="mb-4">
            <button className="text-sm border-gray-600 text-black hover:text-blue-700">
              Change password ?
            </button>
          </div>

          {success ? (
            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-4 hover:bg-blue-200 hover:text-black hover:border-2 hover:border-black transition duration-300"
            >
              {success}{" "}
            </button>
          ) : (
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-300"
            >
              Save{" "}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default TutorProfile;

import React, { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/userAuthSlice";
import { FaUserCircle } from "react-icons/fa";
const PROFILE_URL = "http://localhost:5000/images/";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const sumbmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("image", image);
      formData.append("_id", userInfo._id);
      formData.append("name", name);
      formData.append("email", email);
      for (const key of formData.keys()) {
        console.log(`${key}:`, formData.get(key));
      }
      const res = await updateProfile(formData).unwrap("");

      dispatch(setCredentials({ ...res }));

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
              ) : userInfo.image ? (
                <img
                  src={userInfo.image}
                  alt={userInfo.name}
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
              value={name.toUpperCase()}
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

export default UserProfile;

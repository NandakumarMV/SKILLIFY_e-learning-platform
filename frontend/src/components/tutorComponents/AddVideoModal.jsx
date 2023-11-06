import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Add this import
import { useAddVideoMutation } from "../../slices/tutorApiSlice";
import Loader from "../Loader";

const AddVideoModal = ({ isOpen, onClose, courseId }) => {
  const [video, setVideo] = useState(null);
  const [videoName, setVideoName] = useState("");
  const [addVideos, { isLoading }] = useAddVideoMutation();
  const dispatch = useDispatch(); // Get the dispatch function

  if (!isOpen) {
    return null;
  }

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  const submitVideoHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("video", video);
      formData.append("videoName", videoName);
      formData.append("courseId", courseId);

      const res = await addVideos(formData).unwrap();

      window.location.reload();
    } catch (error) {}
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay fixed inset-0 bg-slate-50 opacity-20 pointer-events-none"></div>
          <div className="modal-content bg-white p-8 rounded-lg shadow-lg pointer-events-auto">
            <h2 className="text-2xl font-bold mb-4">Add New Video</h2>
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
      )}
    </>
  );
};

export default AddVideoModal;

import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useEditVideoMutation } from "../../slices/tutorApiSlice";
import Loader from "../Loader";

const EditVideoModal = ({ isOpen, courseId, videoId, name }) => {
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [videoName, setVideoName] = useState("");
  const [video, setVideo] = useState(null);

  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
    setCurrentCourseId(courseId);
    setCurrentVideoId(videoId);
    setVideoName(name);
  }, [isOpen, courseId, videoId, name]);

  const [editVideos, { isLoading }] = useEditVideoMutation();

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
      formData.append("videoId", videoId);

      const res = await editVideos(formData).unwrap();

      window.location.reload();
    } catch (error) {}
  };
  if (!isOpenRef.current) {
    return null;
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay fixed inset-0 bg-slate-50 opacity-20 pointer-events-none"></div>
          <div className="modal-content bg-white p-8 rounded-lg shadow-lg pointer-events-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Video</h2>
            <form onSubmit={submitVideoHandler} encType="multipart/form-data">
              <input type="hidden" name="courseId" value={courseId} />
              <input type="hidden" name="videoId" value={videoId} />
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

export default EditVideoModal;

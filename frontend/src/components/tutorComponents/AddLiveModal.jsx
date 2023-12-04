import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  useAddVideoMutation,
  useCreateLiveMutation,
} from "../../slices/tutorApiSlice";
import { useNavigate } from "react-router-dom";

const AddLiveModal = ({ isOpen, tutorId, courseId }) => {
  const [liveName, setLiveName] = useState("");
  const [createLive, { isLoading }] = useCreateLiveMutation();
  const dispatch = useDispatch(); // Get the dispatch function
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const submitVideoHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await createLive({ courseId, tutorId, liveName }).unwrap();
      if (res) {
        console.log(res.data.randomId);
        navigate(`/get-live/${res.data.randomId}`);
      }
    } catch (error) {}
  };
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-overlay fixed inset-0 bg-slate-50 opacity-20 pointer-events-none"></div>
        <div className="modal-content bg-white p-8 rounded-lg shadow-lg pointer-events-auto">
          <h2 className="text-2xl font-bold mb-4">Let's Go Live!!</h2>
          <form onSubmit={submitVideoHandler}>
            <input type="hidden" name="courseId" value={courseId} />
            <input type="hidden" name="tutorId" value={tutorId} />

            <input
              type="text"
              value={liveName}
              name="name"
              onChange={(e) => setLiveName(e.target.value)}
              placeholder="Enter Live name"
              className="mb-4 p-2 w-full border rounded border-black"
              rows="4"
            />
            <p className="text-base text-black mb-2">
              To join Live, Email will be Sent to all Students Who Purchased
              this Course.
            </p>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gray-950 text-white hover:bg-gray-300 hover:text-slate-950 hover:font-bold px-4 py-2 rounded border-black"
              >
                Go Live
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLiveModal;

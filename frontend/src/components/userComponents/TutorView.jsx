import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetIndividualRoomMutation,
  useGetTutorDetailsMutation,
} from "../../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { addtoTutor } from "../../slices/courseDetailsSlice";
import { IoMdChatboxes } from "react-icons/io";

const TutorView = () => {
  const { tutorId } = useParams();
  const [getTutorDetails] = useGetTutorDetailsMutation();
  const [getIndividualRoom] = useGetIndividualRoomMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getDetails = async () => {
    try {
      const res = await getTutorDetails(tutorId).unwrap();
      dispatch(addtoTutor(res));
    } catch (error) {
      if (error.status === 403) {
        dispatch(logout());
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    getDetails();
  }, [tutorId]);

  const tutor = useSelector((state) => state.courses.tutor);
  const { userInfo } = useSelector((state) => state.auth);

  const chatHandler = async (trainerId) => {
    const chatId = trainerId;
    const userId = userInfo._id;
    if (chatId) {
      const room = await getIndividualRoom({ userId, tutorId });
      if (room.data) {
        navigate(`/user-messages/${chatId}`);
      }
    }
  };

  return (
    <div className=" flex justify-center flex-col items-center">
      <div className="h-5"></div>

      <div className="flex justify-center items-center text-2xl font-medium text-blue-800">
        Tutor Profile{" "}
      </div>
      <div className="h-5"></div>
      <div className=" w-[40%] p-4  flex flex-col  items-center border-[1px] shadow-md">
        <div className="border-b-2 w-1/2 flex flex-col items-center p-2 shadow-lg">
          {" "}
          <img
            src={tutor[0]?.signedUrl}
            alt={tutor[0]?.name}
            className="w-40 h-40"
          />
          <h3 className="text-base text-slate-950 font-medium">
            {tutor[0]?.name.toUpperCase()}
          </h3>
          <p className="text-sm text-slate-950 font-medium mb-2">
            {tutor[0]?.email}
          </p>
          <IoMdChatboxes
            className="text-2xl"
            onClick={(e) => chatHandler(tutor[0]?._id)}
          />
        </div>

        <div className=" w-[60%] mt-4">
          <p className="text-base text-slate-950 font-medium mb-2">
            Qualifications : {tutor[0]?.qualifications}
          </p>
          <p className="text-base text-slate-950 font-medium mb-2">
            experience : {tutor[0]?.experience}
          </p>
          <p className="text-base text-slate-950 font-medium mb-2">
            About : {tutor[0]?.about}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TutorView;

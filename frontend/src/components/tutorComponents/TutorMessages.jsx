import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetTutorIndividualRoomMutation,
  useGetTutorMessagesMutation,
  useGetTutorRoomsMutation,
  useSendTutorMessageMutation,
} from "../../slices/tutorApiSlice";
import { button, input } from "@material-tailwind/react";
import io from "socket.io-client";
import { FaPaperPlane } from "react-icons/fa";
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const TutorMessages = () => {
  const { tutorInfo } = useSelector((state) => state.tutorAuth);

  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [individual, setIndividual] = useState({});
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selected, setSelected] = useState(true);
  const [brodcastMessage, setBrodcastMessage] = useState("");
  const [invitationSuccess, setInvitationSuccess] = useState({});
  const [invitationSending, setInvitationSending] = useState({});
  const [selectedButton, setSelectedButton] = useState("message");
  const [liveIdInput, setLiveIdInput] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [getIndividualRoom] = useGetTutorIndividualRoomMutation();
  const [getRooms] = useGetTutorRoomsMutation();
  const [GetMessages] = useGetTutorMessagesMutation();
  const [SendMessage] = useSendTutorMessageMutation();

  const messagesContainerRef = useRef(null);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", tutorInfo);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    return () => {
      socket.off("connected");
      socket.off("typing");
      socket.off("stop typing");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchRooms(tutorInfo._id);
  }, [tutorInfo._id]);

  useEffect(() => {
    if (individual._id) {
      fetchMessages();
    }
  }, [individual._id]);

  useEffect(() => {
    // Scroll to the bottom of the messages container if it exists
    messagesContainerRef.current?.scrollTo(
      0,
      messagesContainerRef.current?.scrollHeight
    );
  }, [messages, isTyping]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        individual._id !== newMessageReceived.room._id
      ) {
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });
  const fetchRooms = async (tutorId) => {
    try {
      const res = await getRooms(tutorId).unwrap();
      setRooms(res);
    } catch (err) {
      if (err.status === 401) {
        // dispatch(logout());
        navigate("/tutor/login");
      }
    }
  };
  const fetchMessages = async () => {
    try {
      const fetchedMessages = await GetMessages(individual._id).unwrap();
      setMessages(fetchedMessages);
      socket.emit("join chat", individual._id);
      selectedChatCompare = messages;
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async () => {
    if (content.trim() !== "") {
      try {
        const res = await SendMessage({
          chatid: individual._id,
          sender: tutorInfo._id,
          type: "Tutor",
          content,
        }).unwrap();
        socket.emit("stop typing", individual._id);
        setMessages([...messages, res]);
        setContent("");
        socket.emit("new message", res);
      } catch (err) {
        console.log("Error sending message:", err);
      }
    } else {
    }
  };
  const getTrainerRoom = async (tutorId, userId) => {
    try {
      const res = await getIndividualRoom({ tutorId, userId }).unwrap();
      setIndividual(res, tutorId, userId);
    } catch (err) {
      console.log(err);
    }
  };
  const typingHandler = (e) => {
    setContent(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", individual._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", individual._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const activateMessage = () => {
    setSelected((prev) => !prev);
    setSelectedButton("message");
  };
  const activateLink = () => {
    setSelected((prev) => !prev);
    setSelectedButton("link");
  };
  const dectivateMessage = () => {
    setSelected((prev) => !prev);
    setBrodcastMessage("");
    setInvitationSuccess({});
  };
  const handleSendInvitation = async (roomId, userId) => {
    setInvitationSending((prev) => ({ ...prev, [userId]: true }));
    try {
      if (selectedButton === "message") {
        await SendMessage({
          chatid: roomId,
          sender: tutorInfo._id,
          type: "Tutor",
          content: brodcastMessage,
        }).unwrap();
      }

      setInvitationSuccess((prev) => ({ ...prev, [userId]: true }));
    } catch (error) {
      console.error("Error sending invitation:", error);
      setInvitationSuccess((prev) => ({ ...prev, [userId]: false }));
    } finally {
      setInvitationSending((prev) => ({ ...prev, [userId]: false }));
    }
  };
  return (
    <div className="flex ">
      <div className="lg:w-1/4 md:w-1/2 bg-slate-100 h-screen overflow-y-auto scroll">
        <div className="flex items-center mt-24 mx-9  ">
          {/* <img
            src={tutorInfo.tutorImageName ? tutorInfo.tutorImageName : ""}
            className="rounded-full"
            width={60}
            height={60}
            alt="User Avatar"
          /> */}
          <div className="ml-4 text-black">
            <h3 className="text-2xl">{tutorInfo.name}</h3>
            {selected ? (
              <button
                onClick={dectivateMessage}
                className="text-lg bg-red-600 rounded font-light mt-2 p-1"
              >
                Done
              </button>
            ) : (
              <>
                <button
                  onClick={activateMessage}
                  className="text-lg bg-green-600 rounded font-light mt-2 p-1"
                >
                  Message
                </button>
              </>
            )}
          </div>
        </div>
        <hr className="mt-4" />

        <div className="text-blue-900 text-xl m-3">Messages</div>
        {selected && (
          <input
            className="w-3/4 mx-8 h-10 rounded-full p-4 shadow-md bg-slate-100"
            type="text"
            placeholder="type a message....."
            value={brodcastMessage}
            onChange={(e) => setBrodcastMessage(e.target.value)}
            required
          />
        )}
        <div className="mx-8 h-full">
          {rooms.map((room, index) => (
            <div
              onClick={() => getTrainerRoom(tutorInfo._id, room.user._id)}
              key={index}
              className="flex items-center py-2 border-b-[1px] border-gray-700 cursor-pointer "
            >
              <img
                src={room?.user?.imageUrl ? room.user.imageUrl : ""}
                className="rounded-full w-16 h-16"
                width={60}
                height={60}
                alt="User Avatar"
              />
              <div className="ml-4 text-black">
                <h3 className="text-xl">{room?.user?.name}</h3>
                <p className="text-xs font-light text-gray-500">
                  {room?.user?.email}
                </p>
              </div>
              {selected && (
                <>
                  {invitationSending[room?.user?._id] ? (
                    <div className="ml-2 text-sm text-white">Sending...</div>
                  ) : invitationSuccess[room?.user?._id] ? (
                    <div className="ml-2 text-green-500">done!</div>
                  ) : (
                    <button
                      className="bg-blue-800 text-white ml-2 rounded p-1 text-sm"
                      onClick={() =>
                        handleSendInvitation(room._id, room.user._id)
                      }
                    >
                      Send
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className=" md:w-3/4 bg-slate-50  h-screen flex flex-col items-center lg:w-1/2  ">
        {individual._id ? (
          <>
            <div className="w-3/4 bg-amber-200 mt-24 rounded-full flex items-center ">
              <img
                src={individual?.user?.signedUrl}
                className="rounded-full m-1 w-14 h-14"
                alt="User Avatar"
              />
              <div className="m-1 mr-auto">
                <h3 className="text-lg">{individual?.user?.name}</h3>
                <p className="text-sm font-light text-green-500">online</p>
              </div>
            </div>
            <div
              className="h-3/4 w-full  overflow-x-auto scroll "
              ref={messagesContainerRef}
            >
              <div className="h-[100px] px-10 py-14">
                {messages?.map((message, index) => (
                  <div
                    key={index}
                    className={`max-w-[45%] p-3 mb-6 rounded-b-xl rounded-tr-lg ${
                      message.senderType === "Tutor"
                        ? "ml-auto bg-slate-200"
                        : "bg-amber-200"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
                {isTyping && (
                  <button className="text-white bg-gray-700 rounded-full w-20 mr-auto p-1">
                    typing...
                  </button>
                )}
              </div>
            </div>

            <div className="p-14 w-full flex items-center ">
              <input
                className="w-full h-10 rounded-full p-4 shadow-md bg-amber-200"
                type="text"
                placeholder="type a message....."
                value={content}
                onChange={typingHandler}
              />
              <FaPaperPlane
                className="text-2xl text-blue-900 m-3 cursor-pointer"
                onClick={sendMessage}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-white">Select a chat to send messages.</p>
          </div>
        )}
      </div>

      <div className="sm:w-0 md:w-0 bg-slate-100  h-screen lg:w-1/4"></div>
    </div>
  );
};

export default TutorMessages;

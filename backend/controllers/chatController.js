import asyncHandler from "express-async-handler";
import ChatMessage from "../models/chatModel.js";
import ChatRoom from "../models/chatRoom.js";
import generateUrl from "../utils/generateS3Url.js";

const createRoom = asyncHandler(async (req, res) => {
  try {
    const { userId, tutorId } = req.body;
    let chatRoom = await ChatRoom.findOne({
      user: userId,
      tutor: tutorId,
    });
    if (!chatRoom) {
      chatRoom = new ChatRoom({
        user: userId,
        tutor: tutorId,
        messages: [],
      });
      await chatRoom.save();
    }

    const roomDetails = await ChatRoom.findOne({ _id: chatRoom._id }).populate({
      path: "tutor",
      select: "_id name email tutorImageName",
    });
    const signedUrl = await generateUrl(roomDetails.tutor.tutorImageName);
    const roomDetail = roomDetails.toObject();
    roomDetail.tutor.signedUrl = signedUrl;
    res.status(200).json(roomDetail);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating or getting chat room" });
  }
});
const createTutorRoom = asyncHandler(async (req, res) => {
  try {
    const { userId, tutorId } = req.body;
    let chatRoom = await ChatRoom.findOne({
      user: userId,
      tutor: tutorId,
    });

    if (!chatRoom) {
      chatRoom = new ChatRoom({
        user: userId,
        tutor: tutorId,
        messages: [],
      });
      await chatRoom.save();
    }
    const roomDetails = await ChatRoom.findOne({ _id: chatRoom._id }).populate({
      path: "user",
      select: "_id name email userImageName",
    });
    let signedUrl;

    if (roomDetails.user && roomDetails.user.userImageName) {
      signedUrl = await generateUrl(roomDetails.user.userImageName);
    }
    // Assign the result of toObject() back to roomDetails
    const roomDetail = roomDetails.toObject();

    // Attach the signedUrl to roomDetails.tutor if available
    if (signedUrl) {
      roomDetail.user.signedUrl = signedUrl;
    }
    res.status(200).json(roomDetail);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating or getting chat room" });
  }
});
const getRooms = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const rooms = await ChatRoom.find({ user: userId }).populate({
    path: "tutor",
    select: "_id name email  tutorImageName",
  });

  if (rooms) {
    const roomsWithUrls = await Promise.all(
      rooms.map(async (room) => {
        if (room.tutor && room.tutor.tutorImageName) {
          const url = await generateUrl(room.tutor.tutorImageName);
          return {
            ...room.toObject(),

            tutor: {
              ...room.tutor.toObject(),
              imageUrl: url,
            },
          };
        } else {
          return room.toObject();
        }
      })
    );
    res.status(200).json(roomsWithUrls);
  } else {
    res.status(400).json({ message: "Failed to fetch rooms" });
  }
});

const chatSend = asyncHandler(async (req, res) => {
  const { content, chatid, sender, type } = req.body;
  // Create a new chat message
  const newMessage = new ChatMessage({
    room: chatid,
    sender: sender,
    senderType: type,
    content: content,
  });

  // Save the chat message
  await newMessage.save();

  let chatRoom = await ChatRoom.findOne({ _id: chatid });
  if (chatRoom) {
    chatRoom.messages.push(newMessage._id);
    chatRoom.latestMessage = content;
  }
  await chatRoom.save();

  // Populate the sender field with specific fields (_id, name, email)
  // and also populate the nested fields room.user and room.doctor
  await newMessage.populate([
    { path: "sender", select: "_id name email" },
    {
      path: "room",
      populate: [
        { path: "user", select: "_id name email" },
        { path: "tutor", select: "_id name email" },
      ],
    },
  ]);
  res.json(newMessage);
});

const getMessages = asyncHandler(async (req, res) => {
  const { roomid } = req.params;
  try {
    const messages = await ChatMessage.find({ room: roomid }).sort({
      createdAt: 1,
    });
    if (messages) {
      res.status(200).json(messages);
    } else {
      res
        .status(404)
        .json({ message: "No messages found for the given room." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getTutorRooms = asyncHandler(async (req, res) => {
  const { tutor } = req.params;
  const rooms = await ChatRoom.find({ tutor: tutor }).populate({
    path: "user",
    select: "_id name email userImageName",
  });

  if (rooms) {
    const roomsWithUrls = await Promise.all(
      rooms.map(async (room) => {
        if (room.user && room.user.userImageName) {
          const url = await generateUrl(room.user.userImageName);
          return {
            ...room.toObject(),
            user: {
              ...room.user.toObject(),
              imageUrl: url,
            },
          };
        } else {
          return room.toObject();
        }
      })
    );
    res.status(200).json(roomsWithUrls);
  } else {
    res.status(400).json({ message: "Failed to fetch rooms" });
  }
});
export {
  createRoom,
  getRooms,
  createTutorRoom,
  getTutorRooms,
  getMessages,
  chatSend,
};

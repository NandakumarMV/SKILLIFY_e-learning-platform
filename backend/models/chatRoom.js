import mongoose from "mongoose";

const chatRoomSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutor",
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatModel",
    },
  ],
  latestMessage: {
    type: String,
    default: null,
  },
});
const ChatRoom = mongoose.model("chatRoom", chatRoomSchema);

export default ChatRoom;

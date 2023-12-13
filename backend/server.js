import express from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middleware/errorMiddle.js";
import adminRoutes from "./routes/adminRoutes.js";
import tutorRoutes from "./routes/tutorRoutes.js";

const port = process.env.PORT || 5000;
connectDB();
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tutor", tutorRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

const server = app.listen(port, () =>
  console.log(`server started on port ${port}`)
);

import { Server } from "socket.io";

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // socket.on("uservideoCall", ({ to, offer }) => {
  //   io.to(to).emit("incoming:call", { from: socket.id, offer });
  // });

  // socket.on('videoCall',(roomId)=>{
  //    const room=roomId;

  // })

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.room;
    if (!chat.user || !chat.tutor) {
      return console.log("chat.users not defined");
    }

    if (chat.user._id === newMessageReceived.sender._id) {
      socket.to(chat.tutor._id).emit("message received", newMessageReceived);
    }

    if (chat.tutor._id === newMessageReceived.sender._id) {
      socket.to(chat.user._id).emit("message received", newMessageReceived);
    }
  });
  socket.off("setup", () => {
    socket.leave(userData._id);
  });
});

app.use(errorHandler);
app.use(notFound);

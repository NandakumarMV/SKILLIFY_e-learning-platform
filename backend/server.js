import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middleware/errorMiddle.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import tutorRoutes from "./routes/tutorRoutes.js";
const port = process.env.PORT || 5000;
connectDB();
const app = express();

// app.use("/admin", adminRoutes);
// app.use("/tutor", tutorRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));
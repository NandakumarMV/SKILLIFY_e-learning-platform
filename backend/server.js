import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import tutorRoutes from "./routes/tutorRoutes.js";
const port = process.env.PORT || 5000;
connectDB();
const app = express();

app.use("/", userRoutes);
app.use("/admin", adminRoutes);
app.use("/tutor", tutorRoutes);

app.listen(port, () => console.log(`server started on port ${port}`));

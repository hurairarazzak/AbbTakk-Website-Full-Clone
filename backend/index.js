import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import newsRoutes from "./routes/newsRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow all origins for now (testing only)
app.use(cors());

// ✅ Middlewares
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/news", newsRoutes);
app.use("/api/admin", adminRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
  })
  .catch((err) => console.error(err));
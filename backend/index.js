import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import newsRoutes from "./routes/newsRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
// ✅ New (allow both frontend domains OR use wildcard if safe)
app.use(cors({
  origin: [
    "https://abb-takk-website-full-clone.vercel.app",
    "https://abb-takk-news-website.vercel.app"
  ],
  credentials: true,
}));
app.use(express.json({extended:true}));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("Incoming request from:", req.headers.origin);
  next();
});

// Routes
app.use("/api/news", newsRoutes);
app.use("/api/admin", adminRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
  })
  .catch((err) => console.error(err));
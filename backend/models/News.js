import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: String,
  content: String,
  category: { type: String, required: false }, // ✅ Make optional
  slug: { type: String, required: true, unique: true },
  isPinned: { type: Boolean, default: false },
  isMostPopular: { type: Boolean, default: false }
}, { timestamps: true });

const News = mongoose.model("News", newsSchema);
export default News;

import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  isPinned: { type: Boolean, default: false },
  isMostPopular: { type: Boolean, default: false },
}, {
  timestamps: true
});

const News = mongoose.model("News", newsSchema);
export default News;

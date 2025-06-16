import News from "../models/News.js";

// Utility to generate slug from title
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getAllNews = async (req, res) => {
  try {
    const allNews = await News.find();
    res.json(allNews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getNewsBySlug = async (req, res) => {
  try {
    const news = await News.findOne({ slug: req.params.slug });
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getNewsByCategory = async (req, res) => {
  try {
    const category = req.params.category.toUpperCase();
    const news = await News.find({ category });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createNews = async (req, res) => {
  try {
    const { title, image, content, category, isPinned, isMostPopular } = req.body;

    const slug = slugify(title);

    const newNews = new News({
      title,
      image,
      content,
      category,
      slug,
      isPinned,
      isMostPopular,
    });

    await newNews.save();
    res.status(201).json(newNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateNews = async (req, res) => {
  try {
    const updated = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: "News deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

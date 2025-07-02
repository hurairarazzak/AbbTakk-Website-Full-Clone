import express from "express";
import News from '../models/News.js';
import upload from "../middleware/upload.js";
import verifyAdmin from "../middleware/auth.js";
import {
  getAllNews,
  getNewsBySlug,
  getNewsByCategory,
  createNews,
  deleteNews,
  getMostPopularNews,
  searchNews,
} from "../controllers/newsController.js";

const router = express.Router();

router.get("/", getAllNews);
router.get("/slug/:slug", getNewsBySlug);
router.get("/popular", getMostPopularNews);
router.get("/search", searchNews);

router.post("/", verifyAdmin, upload.single("image"), createNews);
router.put("/:id", verifyAdmin);
router.delete("/:id", verifyAdmin, deleteNews);

// ✅ category-based fetch with case-insensitive matching
router.get('/category/:category', async (req, res) => {
  const category = decodeURIComponent(req.params.category); // ✅ FIX: handle %20 etc.

  try {
    const news = await News.find({
      category: { $regex: new RegExp(`^${category}$`, 'i') },
      isMostPopular: false
    }).sort({ createdAt: -1 }); // ✅ Sorted latest first

    res.json(news);
  } catch (err) {
    console.error('Error fetching category news:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
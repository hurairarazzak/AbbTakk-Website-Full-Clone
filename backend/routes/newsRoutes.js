import express from "express";
import {
  getAllNews,
  getNewsBySlug,
  getNewsByCategory,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";

const router = express.Router();

router.get("/", getAllNews);
router.get("/slug/:slug", getNewsBySlug);
router.get("/category/:category", getNewsByCategory);
router.post("/", createNews);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);

export default router;

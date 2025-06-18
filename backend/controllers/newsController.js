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

export const getMostPopularNews = async (req, res) => {
  try {
    const allPopular = await News.find({ isMostPopular: true }).sort({ createdAt: -1 });

    let pinned = allPopular.find(news => news.isPinned);

    // ✅ If no news is pinned, temporarily pin the latest one (not in DB)
    if (!pinned && allPopular.length > 0) {
      pinned = allPopular[0]; // latest
    }

    const others = allPopular.filter(news => news._id.toString() !== pinned?._id.toString());

    res.json({
      pinnedNews: pinned || null,
      otherNews: others,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getNewsByCategory = async (req, res) => {
  try {
    const category = req.params.category.toUpperCase();

    const news = await News.find({
      category: category,
      isMostPopular: false, // ✅ Confirmed by you
    });

    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createNews = async (req, res) => {
  try {
    const { title, content, category, isPinned, isMostPopular } = req.body;

    // Validation
    if (isPinned === 'true' && isMostPopular !== 'true') {
      return res.status(400).json({
        message: "Pinned news must also be marked as Most Popular.",
      });
    }

    if (
      isPinned === 'false' &&
      isMostPopular === 'false' &&
      (!category || category.trim() === '')
    ) {
      return res.status(400).json({
        message: "Category is required when news is not popular or pinned.",
      });
    }

    // ✅ Unpin previous news if this is new pinned
    if (isPinned === 'true' && isMostPopular === 'true') {
      await News.updateMany(
        { isPinned: true },
        { $set: { isPinned: false } }
      );
    }

    const slug = slugify(title);
    const imageUrl = req.file?.path;

    const newNews = new News({
      title,
      image: imageUrl,
      content,
      category: (isMostPopular === 'true' ? null : category),
      slug,
      isPinned: isPinned === 'true',
      isMostPopular: isMostPopular === 'true',
    });

    await newNews.save();
    res.status(201).json(newNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const updateNews = async (req, res) => {
  try {
    const { title, image, content, category, isPinned, isMostPopular } = req.body;

    if (isPinned && !isMostPopular) {
      return res.status(400).json({
        message: "Pinned news must also be marked as Most Popular.",
      });
    }    

    const slug = title ? slugify(title) : undefined;

    const updatedFields = {
      ...(title && { title }),
      ...(image && { image }),
      ...(content && { content }),
      ...(category && { category }),
      ...(typeof isPinned !== 'undefined' && { isPinned }),
      ...(typeof isMostPopular !== 'undefined' && { isMostPopular }),
      ...(slug && { slug }),
    };

    // ✅ Remove category if it's Most Popular
    if (isMostPopular) {
      updatedFields.category = null;
    }

    const updated = await News.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    res.json(updated);

    if ((isMostPopular && !isPinned) || (!isMostPopular && isPinned)) {
      return res.status(400).json({
        message: "isMostPopular and isPinned must both be true or both be false together.",
      });
    }
    
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

// controllers/newsController.js (bottom pe add karo)
export const searchNews = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.status(400).json({ message: "Query is required" });

    const results = await News.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import React, { useEffect, useState } from "react";
import { fetchCategoryNews } from "../services/newsService";
import { useNavigate } from "react-router-dom";

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const FullCategoryNews = ({ category }) => {
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadNews = async () => {
      try {
        const res = await fetchCategoryNews(category);
        setNewsList(res);
      } catch (err) {
        console.error("Error loading category news:", err);
      }
    };
    loadNews();
  }, [category]);

  return (
    <div className="max-w-[1300px] mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold text-[#dd3333] mb-6 border-b border-gray-200 pb-2">
        {category}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsList.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded shadow-sm overflow-hidden group cursor-pointer"
            onClick={() =>
              navigate(`/${slugify(item.title)}`, {
                state: item,
              })
            }
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[200px] object-cover group-hover:opacity-80 transition"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-red-600 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullCategoryNews;

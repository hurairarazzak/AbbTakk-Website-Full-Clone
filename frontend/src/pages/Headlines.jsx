import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategoryNews } from '../services/newsService';

const Headlines = () => {
  const [headlines, setHeadlines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHeadlines = async () => {
      try {
        const res = await fetchCategoryNews('Headlines');
        setHeadlines(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error('Error fetching headlines:', err);
      }
    };
    loadHeadlines();
  }, []);

  const slugify = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <div className="max-w-[1300px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
      
      {/* LEFT - Main News Grid */}
      <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
        {headlines.map((news) => (
          <div
            key={news._id}
            className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer"
            onClick={() => navigate(`/${slugify(news.title)}`, { state: news })}
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 leading-tight hover:text-red-600 transition">
                {news.title}
              </h2>
              <div className="text-sm text-gray-500 mb-2 flex gap-4">
                <span>📅 {new Date(news.createdAt).toLocaleDateString()}</span>
                <span>💬 0</span>
                <span>👁️ 9</span>
              </div>
              <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                {news.content.slice(0, 200)}...
              </p>
              <button className="bg-black text-white text-sm px-4 py-1 hover:bg-red-600 transition">
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT - Latest News List */}
      <div className="w-full lg:w-1/3">
        <h3 className="text-lg font-bold border-b border-black pb-1 mb-3">
          LATEST NEWS
        </h3>
        <div className="space-y-3">
          {headlines.map((item) => (
            <div
              key={item._id}
              className="text-sm text-black hover:text-red-600 transition cursor-pointer border-b pb-2"
              onClick={() => navigate(`/${slugify(item.title)}`, { state: item })}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Headlines;

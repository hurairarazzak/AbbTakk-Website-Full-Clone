import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchHeadlines } from '../services/newsService';

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const HeadlinesSection = () => {
  const navigate = useNavigate();
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const res = await fetchHeadlines();
        console.log('✅ Final Headlines Data:', res); // <-- This will show array of news
        setHeadlines(res.slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch headlines:', err);
      }
    };
    loadNews();
  }, []);

  return (
    <section className="max-w-[1300px] mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold text-[#dd3333] mb-4 border-b border-gray-300 pb-2">
        Headlines
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {headlines.map((news) => (
          <div
            key={news._id}
            className="relative group overflow-hidden shadow-md cursor-pointer"
            onClick={() => navigate(`/${slugify(news.title)}`, { state: news })}
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/60 to-transparent p-3">
              <h3 className="text-white text-sm font-semibold">{news.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeadlinesSection;

import React, { useEffect, useState } from 'react';
import { FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { fetchPopularNews } from '../services/newsService';

const slugify = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const MostPopular = () => {
  const navigate = useNavigate();
  const [pinnedNews, setPinnedNews] = useState(null);
  const [otherNews, setOtherNews] = useState([]);

  useEffect(() => {
    const loadPopular = async () => {
      try {
        const data = await fetchPopularNews();
        setPinnedNews(data.pinnedNews);
        setOtherNews(data.otherNews);
      } catch (error) {
        console.error('Failed to load popular news', error);
      }
    };
    loadPopular();
  }, []);

  return (
    <section className="max-w-[1300px] mx-auto pb-5 px-4 mt-10">
      <h2 className="text-xl font-bold border-b pb-2 mb-4">MOST POPULAR</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Pinned News */}
        {pinnedNews && (
          <div
            className="lg:w-[50%] w-full cursor-pointer"
            onClick={() =>
              navigate(`/${slugify(pinnedNews.title)}`, { state: pinnedNews })
            }
          >
            <img
              src={pinnedNews.image}
              alt="Pinned News"
              className="w-full h-60 object-cover"
            />
            <h3 className="mt-2 text-lg font-semibold hover:text-red-600">
              {pinnedNews.title}
            </h3>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <FaClock className="text-xs" /> {pinnedNews.date}
            </p>
            <p className="text-sm mt-1 text-gray-700">{pinnedNews.desc}</p>
          </div>
        )}

        {/* Other News */}
        <div className="lg:w-[35%] w-full space-y-4">
          {otherNews.map((news, index) => (
            <div
              key={index}
              className="flex items-start gap-3 pb-2 cursor-pointer"
              onClick={() => navigate(`/${slugify(news.title)}`, { state: news })}
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-20 h-14 object-cover"
              />
              <div>
                <h4 className="text-sm font-semibold hover:text-red-600">
                  {news.title}
                </h4>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <FaClock className="text-xs" /> {news.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Ads */}
        <div className="lg:w-[27%] w-full space-y-4">
          <a className="p-4" href="live-tv">
            <img
              src="https://abbtakk.tv/wp-content/uploads/2023/07/watch-live.webp"
              alt="Ad 1"
              className="w-full object-cover rounded"
            />
          </a>
          <img
            src="https://abbtakk.tv/wp-content/uploads/2023/07/mobile-app.webp"
            alt="Ad 2"
            className="w-full object-cover rounded"
          />
        </div>
      </div>
    </section>
  );
};

export default MostPopular;

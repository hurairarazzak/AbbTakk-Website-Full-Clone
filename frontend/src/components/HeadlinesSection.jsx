import React from 'react';
import { useNavigate } from 'react-router-dom';

const dummyNews = [
  {
    id: 1,
    title: "Grand Mosque Imam urges compassion, solidarity with Palestine in Hajj sermon",
    image: "https://i.tribune.com.pk/media/images/hajj-sermon1749139553-0/hajj-sermon1749139553-0-100x90.webp",
    content: "Full news content for Hajj sermon...",
    date: "June 6, 2025",
  },
  {
    id: 2,
    title: "PPP chairman slammed India for rejecting calls for joint terror probes and refusing to engage in peace dialogue",
    image: "https://i.tribune.com.pk/media/images/bilawal-middle-east-institute1749148774-0/bilawal-middle-east-institute1749148774-0-640x480.webp",
    content: "Full news content about PPP chairman...",
    date: "June 6, 2025",
  },
  {
    id: 3,
    title: "PM Shehbaz lands in Saudi Arabia for two-day official visit",
    image: "https://i.tribune.com.pk/media/images/pm-ss1749138129-0/pm-ss1749138129-0-200x150.webp",
    content: "Details of PM Shehbaz's Saudi visit...",
    date: "June 6, 2025",
  },
  {
    id: 4,
    title: "Trump slams Musk for opposing tax plan, says relationship may be over",
    image: "https://i.tribune.com.pk/media/images/trump-musk1749151089-0/trump-musk1749151089-0-196x127.webp",
    content: "Trump vs Musk tax plan issue...",
    date: "June 6, 2025",
  },
];

// Slugify function
const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const HeadlinesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-[1300px] mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold text-[#dd3333] mb-4 border-b border-gray-300 pb-2">
        Headlines
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dummyNews.map((news) => (
          <div
            key={news.id}
            className="relative group overflow-hidden` shadow-md cursor-pointer"
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

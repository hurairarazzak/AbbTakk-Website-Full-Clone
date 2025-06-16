import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { newsData } from '../data/newsData';

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const NewsDetails = () => {
  const { slug } = useParams();
  const location = useLocation();

  // Step 1: Try to get from passed state
  const passedNews = location.state;

  // Step 2: If state not available, search in newsData
  let foundNews = passedNews || null;

  if (!foundNews) {
    for (const category in newsData) {
      const match = newsData[category].find((item) => slugify(item.title) === slug);
      if (match) {
        foundNews = match;
        break;
      }
    }
  }

  // Step 3: Still not found
  if (!foundNews) {
    return <div className="max-w-[1000px] mx-auto mt-10 text-red-600">News not found.</div>;
  }

  return (
    <div className="max-w-[800px] mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{foundNews.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{foundNews.date}</p>
      <img src={foundNews.image} alt={foundNews.title} className="w-full h-72 object-cover mb-4" />
      <p className="text-gray-700 text-base leading-7">{foundNews.content || 'This is the full news content.'}</p>
    </div>
  );
};

export default NewsDetails;

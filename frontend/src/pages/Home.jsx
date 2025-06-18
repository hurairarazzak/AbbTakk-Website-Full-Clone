import React, { useEffect, useState } from "react";
import Headlines from '../components/HeadlinesSection';
import MostPopular from '../components/MostPopular';
import TopTierCategories from "../components/TopTierCategories";
import { fetchCategoryNews } from "../services/newsService";

const orderedCategories = [
  ["PAKISTAN", "WORLD", "BUSINESS", "ABBTAKK SPECIAL"],
  ["ENTERTAINMENT", "SPORTS", "PROGRAMS", "BIG STORIES"],
  ["ACCIDENTS", "CRIME AND CORRUPTION", "COURTS AND CASES", "HEALTH AND ENVIRONMENT"],
  ["TECHNOLOGY"]
];

const Home = () => {
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    const loadAllCategories = async () => {
      const result = {};
      for (const group of orderedCategories) {
        for (const category of group) {
          try {
            const res = await fetchCategoryNews(category);
            const newsArray = Array.isArray(res) ? res : res?.data || [];
            result[category] = newsArray
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // newest first
              .slice(0, 5); // only top 5
          } catch (err) {
            console.error(`Error fetching news for category: ${category}`, err);
          }
        }
      }
      setNewsData(result);
    };
    loadAllCategories();
  }, []);

  return (
    <>
      <Headlines />
      <MostPopular />
      <div className="max-w-[1300px] mx-auto py-6 px-2">
        {orderedCategories.map((group, idx) => (
          <div
            key={idx}
            className={`grid gap-6 ${group.length === 4
                ? "grid-cols-1 md:grid-cols-4"
                : group.length === 3
                  ? "grid-cols-1 md:grid-cols-3"
                  : "grid-cols-1 md:grid-cols-2"
              }`}
          >
            {group.map((category) =>
              newsData[category] ? (
                <TopTierCategories
                  key={category}
                  title={category}
                  news={newsData[category]}
                />
              ) : null
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;

import React from "react";
import Headlines from '../components/HeadlinesSection'
import MostPopular from '../components/MostPopular'
import TopTierCategories from "../components/TopTierCategories";
import { newsData } from "../data/newsData";

const orderedCategories = [
  ["PAKISTAN", "WORLD", "BUSINESS", "ABBTAKK SPECIAL"],
  ["ENTERTAINMENT", "SPORTS", "PROGRAMS", "BIG STORIES"],
  ["ACCIDENTS", "CRIME AND CORRUPTION", "COURTS AND CASES", "HEALTH AND ENVIRONMENT"],
  ["TECHNOLOGY"]
];

const Home = () => {
  return (
    <>
    <Headlines/>
    <MostPopular/>
    <div className="max-w-[1300px] mx-auto py-6 px-2">
      {orderedCategories.map((group, idx) => (
        <div key={idx} className={`grid gap-6 ${group.length === 4 ? "grid-cols-1 md:grid-cols-4" : group.length === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
          {group.map((category) =>
            newsData[category] ? (
              <TopTierCategories
                key={category}
                title={category}
                news={newsData[category].slice(0, 5)}
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

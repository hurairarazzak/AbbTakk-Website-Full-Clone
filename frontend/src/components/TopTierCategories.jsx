import React from "react";
import { Link } from "react-router-dom";

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const TopTierCategories = ({ title, news }) => {
  const categoryRoute = `/${slugify(title)}`; // e.g. /sports, /world

  return (
    <div className="p-4">
      {/* CATEGORY HEADING WITH ROUTER LINK */}
      <Link to={categoryRoute}>
        <h2 className="text-[14px] font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2 hover:text-red-600 transition-all">
          {title}
        </h2>
      </Link>

      {/* NEWS LIST */}
      <div className="space-y-4">
        {news.map((item, index) => (
          <Link to={`/${item.slug}`} key={index} className="flex items-start gap-3 group">
            <img src={item.image} alt={item.title} className="w-20 h-14 object-cover" />
            <div>
              <h3 className="text-[12px] font-semibold text-gray-700 group-hover:text-red-600">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500">{item.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopTierCategories;

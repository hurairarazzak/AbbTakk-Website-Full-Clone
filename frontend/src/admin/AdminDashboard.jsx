import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/news';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const res = await axios.get(API_URL);
      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setNews(sorted);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const totalNews = news.length;
  const pinnedNews = news.filter(item => item.isPinned).length;
  const popularNews = news.filter(item => item.isMostPopular).length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-600">🛠️ Admin Dashboard</h1>
        <button
          onClick={() => navigate('/admin/manage-news')}
          className="mt-4 sm:mt-0 bg-[#dd3333] text-white px-5 py-2 rounded-md font-medium hover:bg-red-700 transition"
        >
          ➕ Add News
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <h2 className="text-lg font-semibold text-gray-700">Total News</h2>
          <p className="text-3xl text-blue-600 font-bold">{totalNews}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <h2 className="text-lg font-semibold text-gray-700">Pinned News</h2>
          <p className="text-3xl text-green-600 font-bold">{pinnedNews}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <h2 className="text-lg font-semibold text-gray-700">Popular News</h2>
          <p className="text-3xl text-yellow-600 font-bold">{popularNews}</p>
        </div>
      </div>

      {/* News Table */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <h2 className="text-xl font-semibold px-4 py-4 border-b text-gray-800">📰 All News</h2>
        {news.length === 0 ? (
          <p className="text-center p-6 text-gray-500">No news available.</p>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase tracking-wide text-xs">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Pinned</th>
                <th className="px-4 py-3">Popular</th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{item.title}</td>
                  <td className="px-4 py-3">{item.category || '—'}</td>
                  <td className="px-4 py-3">{item.isPinned ? '✅' : '❌'}</td>
                  <td className="px-4 py-3">{item.isMostPopular ? '⭐' : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

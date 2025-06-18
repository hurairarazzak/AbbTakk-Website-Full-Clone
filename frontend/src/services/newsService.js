import axios from 'axios';

const API_URL = 'http://localhost:5000/api/news'; // adjust if needed

export const fetchHeadlines = async () => {
  const res = await axios.get(`${API_URL}/category/Headlines`);
  return res.data; // default
};

export const fetchCategoryNews = async (category) => {
  const res = await axios.get(`${API_URL}/category/${category}`);
  return res.data;
};

export const fetchPopularNews = async () => {
  const res = await axios.get(`${API_URL}/popular`);
  return res.data;
};

export const fetchNewsBySlug = async (slug) => {
  const res = await axios.get(`${API_URL}/slug/${slug}`);
  return res.data;
};

export const searchNews = async (query) => {
  const res = await axios.get(`${API_URL}/search?q=${query}`);
  return res.data;
};

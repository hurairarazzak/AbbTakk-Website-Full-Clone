import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import Home from './pages/Home';
import Headlines from './pages/Headlines';
import Breaking from './pages/Breaking';
import Entertainment from './pages/Entertainment';
import Business from './pages/Business';
import World from './pages/World';
import Programs from './pages/Programs';
import ContactUs from './pages/ContactUs';
import LiveTV from './pages/LiveTv';
import NewsDetail from "./components/NewsDetails";
import Pakistan from './pages/Pakistan';
import Sports from './pages/Sports';
import AbbTakkSpecial from './pages/AbbTakkSpecial';
import Accidents from './pages/Accidents';
import BigStories from './pages/BigStories';
import CrimeAndCorruption from './pages/CrimeAndCorruption';
import CourtAndCases from './pages/CourtAndCases';
import HealthAndEnvironment from './pages/HealthAndEnvironment';
import Technology from './pages/Technology';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminNewsManager from './admin/AdminNewsManager';
import ProtectedRoute from './components/ProtectedRoute';
import LiveScore from './components/LiveScore';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/headlines" element={<Headlines />} />
        <Route path="/breaking" element={<Breaking />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/business" element={<Business />} />
        <Route path="/world" element={<World />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/live-tv" element={<LiveTV />} />
        <Route path="/pakistan" element={<Pakistan />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/abbtakk-special" element={<AbbTakkSpecial />} />
        <Route path="/big-stories" element={<BigStories />} />
        <Route path="/accidents" element={<Accidents />} />
        <Route path="/crime-and-corruption" element={<CrimeAndCorruption />} />
        <Route path="/courts-and-cases" element={<CourtAndCases />} />
        <Route path="/health-and-environment" element={<HealthAndEnvironment />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/:slug" element={<NewsDetail />} />
        <Route path="/live-cricket-score" element={<LiveScore />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-news"
          element={
            <ProtectedRoute>
              <AdminNewsManager />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainSite from './pages/MainSite';
import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import InstagramAdmin from './pages/admin/InstagramAdmin';
import FeaturesAdmin from './pages/admin/FeaturesAdmin';
import FaqAdmin from './pages/admin/FaqAdmin';
import TestimonialsAdmin from './pages/admin/TestimonialsAdmin';
import AboutAdmin from './pages/admin/AboutAdmin';
import HeroAdmin from './pages/admin/HeroAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';
import SEOAdmin from './pages/admin/SEOAdmin';
import SEOManager from './components/SEOManager';

function App() {
  return (
    <Router>
      <SEOManager />
      <Routes>
        {/* Public Website */}
        <Route path="/" element={<MainSite />} />
        <Route path="/product/:slug" element={<MainSite />} />

        {/* Admin Authentication */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="instagram" element={<InstagramAdmin />} />
          <Route path="hero" element={<HeroAdmin />} />
          <Route path="features" element={<FeaturesAdmin />} />
          <Route path="faqs" element={<FaqAdmin />} />
          <Route path="testimonials" element={<TestimonialsAdmin />} />
          <Route path="about" element={<AboutAdmin />} />
          <Route path="seo" element={<SEOAdmin />} />
          <Route path="settings" element={<SettingsAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
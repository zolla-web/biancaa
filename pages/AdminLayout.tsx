import React from 'react';
import { Outlet, Navigate, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Image, 
  MessageSquare, 
  CircleHelp, 
  Star, 
  Instagram,
  BookOpen,
  Globe,
  Quote,
  ArrowLeft
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { to: "/admin", icon: <LayoutDashboard size={20} />, label: "Catalog" },
    { to: "/admin/hero", icon: <Image size={20} />, label: "Hero Section" },
    { to: "/admin/instagram", icon: <Instagram size={20} />, label: "Instagram Feed" },
    { to: "/admin/seo", icon: <Globe size={20} />, label: "SEO Settings" }, // Added SEO Settings
    { to: "/admin/features", icon: <Star size={20} />, label: "Features" },
    { to: "/admin/faqs", icon: <CircleHelp size={20} />, label: "FAQs" }, // Changed MessageCircle to CircleHelp
    { to: "/admin/testimonials", icon: <Quote size={20} />, label: "Testimonials" },
    { to: "/admin/about", icon: <BookOpen size={20} />, label: "Our Story" },
    { to: "/admin/settings", icon: <Settings size={20} />, label: "Global Settings" }, // Changed label to Global Settings
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col h-screen sticky top-0 border-r border-gray-700">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-serif text-brand-pink font-bold">Admin Panel</h2>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-brand-pink text-brand-chocolate font-bold' 
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
          
          <div className="pt-8 mt-8 border-t border-gray-700">
            <a href="/" className="flex items-center gap-3 px-4 py-3 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
              <ArrowLeft size={20} />
              View Live Site
            </a>
          </div>
        </nav>

        <button 
          onClick={() => {
            localStorage.removeItem('adminAuth');
            window.location.href = '/admin/login';
          }}
          className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-500/50 text-red-400 rounded-md hover:bg-red-500 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

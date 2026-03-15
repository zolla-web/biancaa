import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOData } from '../pages/admin/SEOAdmin';

const SEOManager: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Only apply global SEO to non-product pages (which might have their own logic later)
    // For now, apply it everywhere the site is rendered
    const updateSEO = () => {
      const stored = localStorage.getItem('seo_data');
      if (stored) {
        const data: SEOData = JSON.parse(stored);
        
        // Update Title
        document.title = data.metaTitle;

        // Update Description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.setAttribute('name', 'description');
          document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', data.metaDescription);

        // Update Keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.setAttribute('name', 'keywords');
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', data.keywords);
      }
    };

    updateSEO();
  }, [location.pathname]); // Update on route change

  return null; // This component doesn't render anything
};

export default SEOManager;

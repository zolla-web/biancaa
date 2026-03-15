import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PerfumeShowcase from '../components/PerfumeShowcase';
import ProductMenu from '../components/ProductMenu';
import InstagramFeed from '../components/InstagramFeed';
import Features from '../components/Features';
import FAQ from '../components/FAQ';
import Testimonials from '../components/Testimonials';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import FloatingButtons from '../components/FloatingButtons';
import { motion } from 'framer-motion';
import ProductModal from '../components/ProductModal';
import { Perfume } from '../types';
import { slugify } from '../utils/slugify';

const MainSite: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [modalProduct, setModalProduct] = useState<Perfume | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (slug) {
      // Search in both collections
      const collections = ['perfumes_data', 'menu_products_data'];
      let foundProduct: Perfume | null = null;

      for (const key of collections) {
        const stored = localStorage.getItem(key);
        if (stored) {
          const products: Perfume[] = JSON.parse(stored);
          const product = products.find(p => slugify(p.name) === slug);
          if (product) {
            foundProduct = product;
            break;
          }
        }
      }

      if (foundProduct) {
        setModalProduct(foundProduct);
        setIsModalOpen(true);
      }
    }
  }, [slug]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/', { replace: true });
  };
  return (
    <div className="relative bg-black min-h-screen text-white font-sans selection:bg-brand-pink selection:text-brand-chocolate">
      
      {/* Static Optimized Background for better performance */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[20%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(59,38,32,0.15)_0%,rgba(0,0,0,0)_70%)]" />
        <div className="absolute top-[40%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(255,182,193,0.1)_0%,rgba(0,0,0,0)_70%)]" />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <PerfumeShowcase />
          <ProductMenu />
          <InstagramFeed />
          <Features />
          <FAQ />
          <Testimonials />
          <About />
          <Contact />
        </main>
        <Footer />
        <FloatingButtons />
        <ProductModal 
          product={modalProduct} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      </div>
    </div>
  );
};

export default MainSite;

import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingButtons: React.FC = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [settings, setSettings] = useState({
    whatsappNumber: "447848893414",
    whatsappMessage: "Submit Order"
  });

  useEffect(() => {
    const stored = localStorage.getItem('global_settings');
    if (stored) {
      setSettings(JSON.parse(stored));
    }

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${settings.whatsappNumber}`, '_blank');
  };

  return (
    <>
      {/* WhatsApp Button Container - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
        {settings.whatsappMessage && (
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white text-brand-chocolate text-xs font-bold px-2 py-1 rounded mb-2 shadow-lg whitespace-nowrap"
          >
            {settings.whatsappMessage}
          </motion.span>
        )}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={openWhatsApp}
          className="bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-[#128C7E] transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={28} fill="white" />
        </motion.button>
      </div>

      {/* Back To Top - Bottom Left */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-50 bg-brand-pink text-brand-chocolate p-3 md:p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingButtons;
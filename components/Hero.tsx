import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const defaultSlides = [
  {
    id: 1,
    image: "https://hvnlyonline.com/cdn/shop/files/preview_images/111.jpg?q=80&w=1920&auto=format&fit=crop",
    title: "Essence of Elegance",
    subtitle: "Discover the scent that defines you."
  },
  {
    id: 2,
    image: "https://tomorowers.com/nnn.png?q=80&w=1920&auto=format&fit=crop",
    title: "Floral Symphony",
    subtitle: "Nature's finest blooms in a bottle."
  },
  {
    id: 3,
    image: "https://tomorowers.com/New.png?q=80&w=1920&auto=format&fit=crop",
    title: "Midnight Mystery",
    subtitle: "Deep, dark, and unforgettable."
  }
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState(defaultSlides);
  const [accentText, setAccentText] = useState("New Collection");
  const [buttonText, setButtonText] = useState("Shop Now");
  const { t } = useTranslation();

  useEffect(() => {
    const storedSlides = localStorage.getItem('hero_slides');
    const storedAccent = localStorage.getItem('hero_accent');
    const storedButton = localStorage.getItem('hero_button');

    if (storedSlides) setSlides(JSON.parse(storedSlides));
    if (storedAccent) setAccentText(storedAccent);
    if (storedButton) setButtonText(storedButton);

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {slides.length > 0 && (
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slides[current]?.image || ''})` }}
            />
            <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        {slides.length > 0 && (
          <motion.div
            key={`text-${current}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="text-brand-pink tracking-[0.5em] uppercase text-sm md:text-base mb-4 block">
              {accentText}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-white font-bold mb-6">
              {slides[current]?.title}
            </h1>
            <p className="text-gray-200 text-lg md:text-xl font-light max-w-2xl mx-auto mb-8">
              {slides[current]?.subtitle}
            </p>
            <button
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border border-brand-pink text-brand-pink hover:bg-brand-pink hover:text-brand-chocolate transition-all duration-300 uppercase tracking-widest text-sm"
            >
              {buttonText}
            </button>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2 border border-white/20 rounded-full rtl:rotate-180"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2 border border-white/20 rounded-full rtl:rotate-180"
      >
        <ChevronRight size={32} />
      </button>
    </section>
  );
};

export default Hero;
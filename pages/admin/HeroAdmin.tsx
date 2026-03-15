import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, RefreshCw } from 'lucide-react';

interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

const defaultSlides: HeroSlide[] = [
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

const HeroAdmin: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlide[]>(defaultSlides);
  const [accentText, setAccentText] = useState("New Collection");
  const [buttonText, setButtonText] = useState("Shop Now");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const storedSlides = localStorage.getItem('hero_slides');
    const storedAccent = localStorage.getItem('hero_accent');
    const storedButton = localStorage.getItem('hero_button');

    if (storedSlides) setSlides(JSON.parse(storedSlides));
    if (storedAccent) setAccentText(storedAccent);
    if (storedButton) setButtonText(storedButton);
  }, []);

  const handleSlideChange = (id: number, field: keyof HeroSlide, value: string) => {
    setSlides(slides.map(s => s.id === id ? { ...s, [field]: value } : s));
    setIsSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('hero_slides', JSON.stringify(slides));
    localStorage.setItem('hero_accent', accentText);
    localStorage.setItem('hero_button', buttonText);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const resetToDefault = () => {
    if (window.confirm("Are you sure you want to reset the hero section to its default state?")) {
      setSlides(defaultSlides);
      setAccentText("New Collection");
      setButtonText("Shop Now");
      setIsSaved(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Manage Hero Section</h1>
          <p className="text-gray-400">Update images, titles, and call-to-actions for your homepage slider.</p>
        </div>
        <button 
          onClick={resetToDefault}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <RefreshCw size={16} />
          Reset to Default
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Global Hero Settings */}
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
          <h2 className="text-xl font-serif text-white mb-6 border-b border-gray-700 pb-2">Global Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Accent Text (Top Badge)</label>
              <input 
                type="text" 
                value={accentText}
                onChange={(e) => {setAccentText(e.target.value); setIsSaved(false);}}
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" 
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Button Text</label>
              <input 
                type="text" 
                value={buttonText}
                onChange={(e) => {setButtonText(e.target.value); setIsSaved(false);}}
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" 
              />
            </div>
          </div>
        </div>

        {/* Slides Management */}
        <div className="space-y-6">
          <h2 className="text-xl font-serif text-white px-2">Hero Slides</h2>
          {slides.map((slide, index) => (
            <div key={slide.id} className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <span className="bg-brand-pink/20 text-brand-pink px-3 py-1 rounded text-xs font-bold uppercase tracking-widest">
                  Slide {index + 1}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Title</label>
                    <input 
                      type="text" 
                      value={slide.title}
                      onChange={(e) => handleSlideChange(slide.id, 'title', e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Subtitle</label>
                    <textarea 
                      value={slide.subtitle}
                      onChange={(e) => handleSlideChange(slide.id, 'subtitle', e.target.value)}
                      rows={2}
                      className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink resize-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Image URL</label>
                    <input 
                      type="text" 
                      value={slide.image}
                      onChange={(e) => handleSlideChange(slide.id, 'image', e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" 
                    />
                  </div>
                </div>
                
                <div className="relative group">
                  <label className="block text-gray-400 text-sm mb-2">Image Preview</label>
                  <div className="aspect-video rounded-lg overflow-hidden border border-gray-700 bg-gray-900">
                    <img 
                      src={slide.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 bg-gray-900/80 backdrop-blur-md p-6 border-t border-gray-800 flex items-center gap-6 mt-12">
          <button 
            type="submit"
            className="flex items-center gap-2 bg-brand-pink text-brand-chocolate px-10 py-4 rounded hover:bg-white transition-colors font-bold tracking-wide uppercase text-sm"
          >
            <Save size={18} />
            Save Hero Section
          </button>
          {isSaved && (
            <span className="text-green-400 font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Changes saved live!
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default HeroAdmin;

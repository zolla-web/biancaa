import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { translateText } from '../utils/translate';

const Testimonials: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const loadTestimonials = async () => {
      const defaultTestimonials = [
        {
          id: 1,
          name: "Sarah Jenkins",
          role: "Regular Customer",
          content: "The scent profile is unlike anything I've found on the high street. Truly unique.",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
        },
        {
          id: 2,
          name: "Michael Chen",
          role: "Perfume Enthusiast",
          content: "Exceptional packaging and delivery. The 'Noir Intense' is now my signature daily wear.",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
        },
        {
          id: 3,
          name: "Emma Thompson",
          role: "Fashion Blogger",
          content: "A hidden gem. The floral notes are delicate yet powerful. Highly recommended!",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop"
        }
      ];

      const stored = localStorage.getItem('testimonials_data');
      const data = stored ? JSON.parse(stored) : defaultTestimonials;
      
      if (i18n.language !== 'en') {
        const translated = await Promise.all(data.map(async (t: any) => ({
          ...t,
          content: await translateText(t.content, i18n.language),
          role: await translateText(t.role, i18n.language)
        })));
        setTestimonials(translated);
      } else {
        setTestimonials(data);
      }
    };
    
    loadTestimonials();
  }, [i18n.language]);


  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif text-center text-white mb-4">{t('testimonials.title')}</h2>
        <p className="text-center text-brand-pink/60 mb-16 max-w-2xl mx-auto">{t('testimonials.subtitle')}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-black p-8 rounded-xl border border-white/5 relative">
              <Quote className="text-brand-chocolate absolute top-4 right-4 opacity-50" size={40} />
              <p className="text-gray-300 mb-6 italic">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img loading="lazy"src={t.image} alt={t.name} className="w-12 h-12 rounded-full border border-brand-pink object-cover" />
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-brand-pink text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
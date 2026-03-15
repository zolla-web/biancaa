import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { translateText } from '../utils/translate';
import { AboutData } from '../pages/admin/AboutAdmin';

const defaultData: AboutData = {
  title: "The Art of Perfumery",
  subtitle: "Our Story",
  p1: "Founded with a passion for exceptional scents, L'Odeur Exquise brings together the world's most precious ingredients to create liquid poetry. Our master perfumers spend years perfecting each formula, ensuring a sensory journey that lingers in the memory long after the first encounter.",
  p2: "We believe that a fragrance is more than just a scent—it's an extension of your personality, an invisible accessory that completes your presence with elegance and sophistication.",
  buttonText: "Discover the Collection",
  images: [
    "https://i.pinimg.com/originals/89/dc/49/89dc496bedf1183cf35331c4a277b63c.jpg",
    "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?q=80&w=300&auto=format&fit=crop"
  ]
};

const About: React.FC = () => {
  const { i18n } = useTranslation();
  const [data, setData] = React.useState<AboutData>(defaultData);

  React.useEffect(() => {
    const loadAbout = async () => {
      const stored = localStorage.getItem('about_data');
      const initial: AboutData = stored ? { ...defaultData, ...JSON.parse(stored) } : defaultData;
      
      if (initial.images && initial.images.length === 0) {
        initial.images = defaultData.images;
      }

      if (i18n.language !== 'en') {
        const translated: AboutData = {
          ...initial,
          title: await translateText(initial.title, i18n.language),
          subtitle: await translateText(initial.subtitle, i18n.language),
          p1: await translateText(initial.p1, i18n.language),
          p2: await translateText(initial.p2, i18n.language),
          buttonText: await translateText(initial.buttonText, i18n.language)
        };
        setData(translated);
      } else {
        setData(initial);
      }
    };
    
    loadAbout();
  }, [i18n.language]);

  return (
    <section id="about" className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 z-10"
          >
            <span className="text-brand-pink uppercase tracking-widest text-sm">{data.subtitle}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 mb-6">{data.title}</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              {data.p1}
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              {data.p2}
            </p>
            <button 
              onClick={() => document.getElementById('perfumes')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-brand-chocolate text-white hover:bg-white hover:text-black transition-colors uppercase tracking-wider"
            >
              {data.buttonText}
            </button>
          </motion.div>

          {/* Image Grid Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 grid grid-cols-2 gap-4"
          >
            {data.images?.map((img, idx) => (
              <img 
                key={idx}
                loading="lazy"
                src={img} 
                alt={`Story ${idx + 1}`} 
                className={`rounded-lg shadow-2xl border border-white/10 w-full h-48 object-cover ${idx % 2 === 0 ? 'transform translate-y-8' : ''}`} 
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
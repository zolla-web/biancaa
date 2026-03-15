import React, { useState, useEffect } from 'react';
import { Star, Droplet, Leaf, Truck, Heart, Shield, Award, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { translateText } from '../utils/translate';

const Features: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [features, setFeatures] = useState<any[]>([]);

  useEffect(() => {
    const loadFeatures = async () => {
      const defaultFeatures = [
        { iconName: "Star", title: "Premium Quality", desc: "Sourced from the finest ingredients worldwide." },
        { iconName: "Leaf", title: "100% Organic", desc: "Natural extracts without harmful synthetics." },
        { iconName: "Droplet", title: "Long Lasting", desc: "High concentration oils that stay all day." },
        { iconName: "Truck", title: "Fast Delivery", desc: "Secure packaging and rapid shipping." },
      ];

      const stored = localStorage.getItem('features_data');
      const data = stored ? JSON.parse(stored) : defaultFeatures;
      
      if (i18n.language !== 'en') {
        const translated = await Promise.all(data.map(async (f: any) => ({
          ...f,
          title: await translateText(f.title, i18n.language),
          desc: await translateText(f.desc, i18n.language)
        })));
        setFeatures(translated);
      } else {
        setFeatures(data);
      }
    };
    
    loadFeatures();
  }, [i18n.language]);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Leaf': return <Leaf size={32} />;
      case 'Droplet': return <Droplet size={32} />;
      case 'Truck': return <Truck size={32} />;
      default: return <Star size={32} />;
    }
  };

  return (
    <section className="py-20 bg-brand-chocolate text-brand-pink">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-white">{t('features.title')}</h2>
          <p className="mt-4 text-white/70">{t('features.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-black/20 rounded-lg border border-white/10 hover:bg-black/40 transition-colors"
            >
              <div className="mb-4 p-4 bg-white/5 rounded-full text-white">
                {getIcon(feat.iconName)}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{feat.title}</h3>
              <p className="text-sm text-brand-pink/80">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
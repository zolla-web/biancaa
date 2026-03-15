import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Perfume } from '../types';
import { translateText } from '../utils/translate';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { slugify } from '../utils/slugify';

const defaultMenuItems: Perfume[] = [
  { id: 101, name: "Noir Intense", description: "A bold statement for the evening with dark amber.", price: "$145", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop" },
  { id: 102, name: "Citrus Bloom", description: "Energizing notes of lemon and jasmine petals.", price: "$89", image: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=600&auto=format&fit=crop" },
  { id: 103, name: "Woody Whisper", description: "Sandalwood and cedar for a calm embrace.", price: "$115", image: "https://iri7.ru/images/thumbnails/1140/1140/detailed/98/2_g2jq-mb.jpg" },
  { id: 104, name: "Vanilla Dream", description: "Sweet and comforting warmth of pure vanilla.", price: "$92", image: "https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=600&auto=format&fit=crop" },
  { id: 105, name: "Spiced Leather", description: "Rugged yet sophisticated masculine scent.", price: "$130", image: "https://i.pinimg.com/originals/bd/8a/b1/bd8ab14cf01eb8a4a71137b4668f6aa9.jpg" },
  { id: 106, name: "Pure Jasmine", description: "Simple, elegant floral essence of white flowers.", price: "$105", image: "https://avatars.mds.yandex.net/i?id=1965680693b9963b89e2343c0a814679-5490768-images-thumbs&n=13" },
  { id: 107, name: "Midnight Orchid", description: "Rare orchid notes mixed with deep berries.", price: "$160", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop" },
  { id: 108, name: "Golden Saffron", description: "Exotic spices with a touch of liquid gold.", price: "$185", image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?q=80&w=600&auto=format&fit=crop" },
  { id: 109, name: "Oceanic Breeze", description: "Crisp sea salt and fresh linen notes.", price: "$95", image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=600&auto=format&fit=crop" },
  { id: 110, name: "Rose Royale", description: "A classic bouquet of red roses and oud.", price: "$125", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop" },
  { id: 111, name: "Emerald Green", description: "Fresh cut grass and green tea accents.", price: "$80", image: "https://i.pinimg.com/originals/89/dc/49/89dc496bedf1183cf35331c4a277b63c.jpg" },
  { id: 112, name: "Velvet Musk", description: "Soft, powdery musk with a hint of iris.", price: "$110", image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=600&auto=format&fit=crop" },
];

const ProductMenu: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);

  useEffect(() => {
    const loadMenu = async () => {
      const stored = localStorage.getItem('menu_products_data');
      const data: Perfume[] = stored ? JSON.parse(stored) : defaultMenuItems;
      
      if (i18n.language !== 'en') {
        const translated = await Promise.all(data.map(async (p) => ({
          ...p,
          name: await translateText(p.name, i18n.language),
          description: await translateText(p.description, i18n.language)
        })));
        setPerfumes(translated);
      } else {
        setPerfumes(data);
      }
    };
    
    loadMenu();
  }, [i18n.language]);

  return (
    <section id="menu" className="py-20 bg-zinc-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-white">{t('nav.menu')}</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">{t('nav.menu_desc', 'Explore our complete range of exquisite fragrances, crafted for every occasion and personality.')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {perfumes.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/product/${slugify(item.name)}`)}
              className="glass-panel p-4 rounded-lg hover:bg-white/5 transition-colors flex flex-col items-start cursor-pointer group"
            >
              <img loading="lazy"
                src={item.image} 
                alt={item.name} 
                className="w-full aspect-square object-cover rounded-md shadow-lg mb-4"
              />
              <div className="w-full text-center md:text-left">
                <h3 className="text-xl font-serif text-brand-pink group-hover:text-white transition-colors">{item.name}</h3>
                <p className="text-gray-400 text-sm mt-2 h-10 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mt-4 border-t border-white/10 pt-4">
                  <span className="text-white font-bold text-lg">{item.price}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.infoLink) {
                        window.open(item.infoLink, '_blank');
                      } else {
                        const url = getWhatsAppUrl(item.name, `/product/${slugify(item.name)}`);
                        window.open(url, '_blank');
                      }
                    }}
                    className="px-4 py-2 bg-brand-chocolate text-white text-sm rounded-full hover:bg-brand-pink hover:text-brand-chocolate transition-colors font-medium"
                  >
                    {item.infoLink ? t('nav.buyNow', 'Buy Now') : t('nav.orderNow', 'Order Now')}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductMenu;
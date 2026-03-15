import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

interface InstagramData {
  username: string;
  posts: string[];
}

const InstagramFeed: React.FC = () => {
  const [data, setData] = useState<InstagramData>({
    username: "biancaperfumes",
    posts: []
  });

  useEffect(() => {
    const stored = localStorage.getItem('instagram_data');
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (data.posts.length === 0) return null;

  return (
    <section id="instagram" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-white mb-4"
          >
            Follow us on Instagram
          </motion.h2>
          <motion.a 
            href={`https://instagram.com/${data.username}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 text-brand-pink hover:text-white transition-colors text-lg"
          >
            <Instagram size={20} />
            <span>@{data.username}</span>
          </motion.a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.posts.map((url, index) => (
            <motion.a
              key={index}
              href={`https://instagram.com/${data.username}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square group overflow-hidden rounded-xl"
            >
              <img 
                src={url} 
                alt={`Instagram post ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="text-white" size={32} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;

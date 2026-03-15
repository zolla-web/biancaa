import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FaqItem } from '../types';
import { translateText } from '../utils/translate';

const FAQ: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  useEffect(() => {
    const loadFaqs = async () => {
      const defaultFaqs: FaqItem[] = [
        { question: "Are your perfumes long-lasting?", answer: "Yes, we use high concentration 'Eau de Parfum' oils to ensure the scent lingers for 8-12 hours." },
        { question: "Do you offer international shipping?", answer: "Currently we ship within the UK and select European countries." },
        { question: "Can I return an opened bottle?", answer: "Due to hygiene reasons, we cannot accept returns on opened products unless faulty." },
        { question: "Are your ingredients vegan?", answer: "Yes, 100% of our collection is vegan and cruelty-free." },
      ];
      
      const stored = localStorage.getItem('faqs_data');
      const data: FaqItem[] = stored ? JSON.parse(stored) : defaultFaqs;
      
      if (i18n.language !== 'en') {
        const translated = await Promise.all(data.map(async (f) => ({
          question: await translateText(f.question, i18n.language),
          answer: await translateText(f.answer, i18n.language)
        })));
        setFaqs(translated);
      } else {
        setFaqs(data);
      }
    };
    
    loadFaqs();
  }, [i18n.language]);

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-serif text-center text-white mb-12">{t('faq.title')}</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-white/10 rounded-lg bg-white/5 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left text-white hover:bg-white/5 transition-colors"
              >
                <span className="font-serif text-lg">{faq.question}</span>
                {openIndex === index ? <Minus className="text-brand-pink" /> : <Plus className="text-brand-pink" />}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-gray-400"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
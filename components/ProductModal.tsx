import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Perfume } from '../types';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface ProductModalProps {
  product: Perfume | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-white/70 hover:text-white hover:bg-black transition-all"
            >
              <X size={24} />
            </button>

            {/* Left side: Image Image */}
            <div className="md:w-1/2 relative min-h-[300px] md:min-h-full">
              <img 
                src={product.image} 
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-zinc-900/80"></div>
            </div>

            {/* Right side: Details */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
              
              <span className="text-brand-pink uppercase tracking-widest text-sm font-bold mb-2">{t('nav.perfume', 'Luxury Fragrance')}</span>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">{product.name}</h2>
              
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                {product.description}
              </p>
              
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm uppercase tracking-wider mb-1">{t('showcase.price', 'Price')}</span>
                  <span className="text-3xl text-white font-serif">{product.price}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {product.infoLink ? (
                  <a 
                    href={product.infoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-brand-pink text-brand-chocolate px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors font-bold uppercase tracking-wider text-sm group"
                  >
                    <span>{t('nav.moreInfo', 'More Info')}</span>
                    <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <button 
                    onClick={() => {
                      const type = window.location.pathname.includes('/product/menu/') ? 'menu' : 'signature';
                      const url = getWhatsAppUrl(product.name, `/product/${type}/${product.id}`);
                      window.open(url, '_blank');
                    }}
                    className="flex-1 bg-brand-pink text-brand-chocolate px-8 py-4 rounded-full hover:bg-white transition-colors font-bold uppercase tracking-wider text-sm"
                  >
                    {t('nav.orderNow', 'Order Now')}
                  </button>
                )}
                
                <button 
                  onClick={onClose}
                  className="px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors font-bold uppercase tracking-wider text-sm"
                >
                  {t('nav.close', 'Close')}
                </button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;

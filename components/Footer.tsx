import React, { useState, useEffect } from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  const [settings, setSettings] = useState({
    socialInstagram: "https://instagram.com",
    socialFacebook: "https://facebook.com",
    socialTwitter: "https://twitter.com",
    footerDescription: "Discover the essence of luxury with our curated collection of premium perfumes. Experience the scent that defines you."
  });

  useEffect(() => {
    const stored = localStorage.getItem('global_settings');
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-serif text-brand-pink mb-4">L'Odeur</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {settings.footerDescription}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-brand-pink transition-colors text-sm">{t('nav.home')}</a></li>
              <li><a href="#perfumes" className="text-gray-400 hover:text-brand-pink transition-colors text-sm">{t('nav.perfumes')}</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-brand-pink transition-colors text-sm">{t('nav.about')}</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-brand-pink transition-colors text-sm">{t('nav.contact')}</a></li>
            </ul>
          </div>

          {/* Service */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6">{t('footer.contactTitle')}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-brand-pink transition-colors text-sm">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-pink transition-colors text-sm">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-pink transition-colors text-sm">Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-pink transition-colors text-sm">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to get special offers and updates.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/5 border border-white/10 text-white px-4 py-2 text-sm w-full focus:outline-none focus:border-brand-pink"
              />
              <button className="bg-brand-pink text-black px-4 py-2 text-sm font-bold hover:bg-white transition-colors">
                GO
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} L'Odeur Exquise. {t('footer.rights')}
          </p>
          <div className="flex space-x-6">
            <a href={settings.socialInstagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-brand-pink transition-colors"><Instagram size={20} /></a>
            <a href={settings.socialFacebook} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-brand-pink transition-colors"><Facebook size={20} /></a>
            <a href={settings.socialTwitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-brand-pink transition-colors"><Twitter size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
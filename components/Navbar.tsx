import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from '../types';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close language menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  const leftLinks: NavLink[] = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.perfumes'), href: '#perfumes' },
    { name: t('nav.menu'), href: '#menu' },
  ];

  const rightLinks: NavLink[] = [
    { name: t('nav.offers'), href: '#offers' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' }
  ];

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || mobileMenuOpen || langMenuOpen ? 'bg-brand-chocolate/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center relative min-h-[40px]">

          {/* Mobile Menu Button - Left */}
          <button
            className="md:hidden absolute left-0 text-brand-pink z-20 p-2 -ml-2"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              if (langMenuOpen) setLangMenuOpen(false);
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Mobile Language Button - Right */}
          <div className="md:hidden absolute right-0 z-20" ref={langMenuRef}>
            <button
              className="text-white hover:text-brand-pink p-2 flex items-center gap-2 transition-colors"
              onClick={() => {
                setLangMenuOpen(!langMenuOpen);
                if (mobileMenuOpen) setMobileMenuOpen(false);
              }}
              aria-label="Change language"
            >
              <Globe size={24} className={langMenuOpen ? "text-brand-pink" : ""} />
            </button>

            {/* Mobile Language Dropdown */}
            {langMenuOpen && (
              <div className="absolute top-full right-0 mt-4 bg-brand-chocolate/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-sm w-48 overflow-hidden animate-in fade-in slide-in-from-top-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`block w-full text-left px-6 py-4 text-sm tracking-wider uppercase transition-colors ${i18n.language === lang.code ? 'text-brand-pink bg-white/5' : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Left Menu */}
          <div className="hidden md:flex items-center space-x-8 absolute left-4 lg:left-20">
            {leftLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-white hover:text-brand-pink font-sans text-sm tracking-widest uppercase transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Logo Center */}
          <div className="text-center z-10 transition-transform duration-300">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-pink tracking-tighter leading-none">
              Bianca
            </h1>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white">{t('nav.perfume')}</span>
          </div>

          {/* Desktop Right Menu & Language Selector */}
          <div className="hidden md:flex items-center space-x-8 absolute right-4 lg:right-20">
            {rightLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-white hover:text-brand-pink font-sans text-sm tracking-widest uppercase transition-colors"
              >
                {link.name}
              </button>
            ))}

            {/* Desktop Language Dropdown */}
            <div className="relative ml-4 pl-8 border-l border-white/20" ref={langMenuRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="text-white hover:text-brand-pink flex items-center gap-2 transition-colors uppercase tracking-widest text-sm"
              >
                <Globe size={16} />
                <span>{i18n.language?.substring(0, 2) || 'EN'}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute top-full right-0 mt-6 bg-brand-chocolate/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-sm w-40 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block w-full text-left px-4 py-3 text-xs tracking-wider uppercase transition-colors ${i18n.language === lang.code ? 'text-brand-pink bg-white/5' : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-brand-chocolate/95 backdrop-blur-xl transition-all duration-500 ease-in-out overflow-hidden shadow-2xl ${mobileMenuOpen ? 'max-h-[500px] opacity-100 border-t border-white/10' : 'max-h-0 opacity-0 border-t-0 border-transparent'
            }`}
        >
          <div className="flex flex-col items-center px-6 py-8 space-y-6">
            {[...leftLinks, ...rightLinks].map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-center text-white/90 hover:text-brand-pink font-sans text-lg uppercase tracking-[0.2em] transition-colors w-full pb-4 border-b border-white/5 last:border-none last:pb-0"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
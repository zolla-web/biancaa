import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [settings, setSettings] = useState({
    contactPhone: "+44 7848 893414",
    contactEmail: "contact@biancaperfumes.com",
    contactAddress: "123 Luxury Lane, Mayfair, London, UK",
    googleMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.182370726!2d-0.2416813!3d51.5287718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2s!4v1652362871234!5m2!1sen!2s"
  });

  useEffect(() => {
    const stored = localStorage.getItem('global_settings');
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulating email send via mailto using dynamic email setting
    window.location.href = `mailto:${settings.contactEmail}?subject=Inquiry from ${formData.name}&body=${formData.message}%0D%0A%0D%0AFrom: ${formData.email}`;
  };

  return (
    <section id="contact" className="py-20 bg-brand-chocolate/10 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-white">{t('contact.title')}</h2>
          <p className="text-gray-400 mt-4">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="bg-black/50 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h3 className="text-2xl font-serif text-brand-pink mb-6">{t('contact.form.title', 'Get in Touch')}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2 text-sm">{t('contact.form.name')}</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-pink transition-colors"
                  placeholder={t('contact.form.name')}
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm">{t('contact.form.email')}</label>
                <input 
                  type="email" 
                  name="email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-pink transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm">{t('contact.form.message')}</label>
                <textarea 
                  name="message" 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-pink transition-colors"
                  placeholder={t('contact.form.message')}
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-brand-pink text-brand-chocolate font-bold py-3 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                <Send size={18} /> {t('contact.form.send')}
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="flex flex-col space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-xl text-center border border-white/10">
                <div className="bg-brand-pink/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-pink">
                  <Phone />
                </div>
                <h4 className="text-white font-bold">{t('footer.phoneLabel')}</h4>
                <p className="text-gray-400 text-sm mt-2">{settings.contactPhone}</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl text-center border border-white/10">
                <div className="bg-brand-pink/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-pink">
                  <Mail />
                </div>
                <h4 className="text-white font-bold">{t('footer.emailLabel')}</h4>
                <p className="text-gray-400 text-sm mt-2">{settings.contactEmail}</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl text-center border border-white/10 md:col-span-2">
                <div className="bg-brand-pink/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-pink">
                  <MapPin />
                </div>
                <h4 className="text-white font-bold">{t('footer.addressLabel')}</h4>
                <p className="text-gray-400 text-sm mt-2">{settings.contactAddress}</p>
              </div>
            </div>

            {/* Google Map Placeholder */}
            <div className="flex-1 bg-gray-800 rounded-xl overflow-hidden border border-white/10 relative min-h-[300px]">
              <iframe 
                src={settings.googleMapUrl} 
                width="100%" 
                height="100%" 
                style={{ border: 0, position: 'absolute', inset: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
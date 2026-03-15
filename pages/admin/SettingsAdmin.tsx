import React, { useState, useEffect } from 'react';

export interface GlobalSettings {
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  socialInstagram: string;
  socialFacebook: string;
  socialTwitter: string;
  footerDescription: string;
  whatsappNumber: string;
  whatsappMessage: string;
  whatsappOrderMessage: string;
  googleMapUrl: string;
}

const defaultSettings: GlobalSettings = {
  contactPhone: "+44 7848 893414",
  contactEmail: "contact@biancaperfumes.com",
  contactAddress: "123 Luxury Lane, Mayfair, London, UK",
  socialInstagram: "https://instagram.com",
  socialFacebook: "https://facebook.com",
  socialTwitter: "https://twitter.com",
  footerDescription: "Discover the essence of luxury with our curated collection of premium perfumes. Experience the scent that defines you.",
  whatsappNumber: "447848893414",
  whatsappMessage: "Submit Order",
  whatsappOrderMessage: "Bonjour, est-ce que ce produit est disponible ?",
  googleMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.182370726!2d-0.2416813!3d51.5287718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2s!4v1652362871234!5m2!1sen!2s"
};

const SettingsAdmin: React.FC = () => {
  const [settings, setSettings] = useState<GlobalSettings>(defaultSettings);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('global_settings');
    if (stored) {
      setSettings(JSON.parse(stored));
    } else {
      localStorage.setItem('global_settings', JSON.stringify(defaultSettings));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('global_settings', JSON.stringify(settings));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-white mb-2">Global Settings</h1>
        <p className="text-gray-400">Manage contact information, social links, and footer details.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Contact Information */}
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
          <h2 className="text-xl font-serif text-brand-pink mb-6 pb-2 border-b border-gray-700">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
              <input 
                type="text" 
                name="contactPhone"
                value={settings.contactPhone}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" 
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Email Address</label>
              <input 
                type="email" 
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm mb-2">Physical Address</label>
              <input 
                type="text" 
                name="contactAddress"
                value={settings.contactAddress}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm mb-2">Google Map Embed URL</label>
              <textarea 
                name="googleMapUrl"
                value={settings.googleMapUrl}
                onChange={handleChange}
                rows={3}
                placeholder="https://www.google.com/maps/embed?pb=..."
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink resize-none" 
              />
              <p className="text-xs text-gray-500 mt-2">Go to Google Maps -&gt; Share -&gt; Embed a map. Copy ONLY the URL inside the src="..." attribute.</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
          <h2 className="text-xl font-serif text-brand-pink mb-6 pb-2 border-b border-gray-700">WhatsApp Floating Button</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2">WhatsApp Number</label>
              <input 
                type="text" 
                name="whatsappNumber"
                value={settings.whatsappNumber || ''}
                onChange={handleChange}
                placeholder="447848893414"
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" 
              />
              <p className="text-xs text-gray-500 mt-2">Exclude '+' signs and spaces.</p>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Popup Label</label>
              <input 
                type="text" 
                name="whatsappMessage"
                value={settings.whatsappMessage || ''}
                onChange={handleChange}
                placeholder="Submit Order"
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm mb-2">Default Order Greeting (WhatsApp)</label>
              <input 
                type="text" 
                name="whatsappOrderMessage"
                value={settings.whatsappOrderMessage || ''}
                onChange={handleChange}
                placeholder="Bonjour, est-ce que ce produit est disponible ?"
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" 
              />
              <p className="text-xs text-gray-500 mt-2">This text will appear before the product name and link when a client clicks "Order".</p>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
          <h2 className="text-xl font-serif text-brand-pink mb-6 pb-2 border-b border-gray-700">Social Media Links</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Instagram URL</label>
              <input 
                type="url" 
                name="socialInstagram"
                value={settings.socialInstagram}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" 
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Facebook URL</label>
              <input 
                type="url" 
                name="socialFacebook"
                value={settings.socialFacebook}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" 
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Twitter/X URL</label>
              <input 
                type="url" 
                name="socialTwitter"
                value={settings.socialTwitter}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" 
              />
            </div>
          </div>
        </div>

        {/* Footer Details */}
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
          <h2 className="text-xl font-serif text-brand-pink mb-6 pb-2 border-b border-gray-700">Footer Details</h2>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Brand Description</label>
            <textarea 
              name="footerDescription"
              value={settings.footerDescription}
              onChange={handleChange}
              rows={4}
              className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink resize-none" 
            />
            <p className="text-xs text-gray-500 mt-2">This short paragraph appears below the logo in the footer.</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            type="submit"
            className="bg-brand-pink text-brand-chocolate px-8 py-3 rounded hover:bg-white transition-colors font-bold tracking-wide"
          >
            Save All Settings
          </button>
          {isSaved && <span className="text-green-400 font-bold">✓ Settings saved successfully!</span>}
        </div>

      </form>
    </div>
  );
};
export default SettingsAdmin;

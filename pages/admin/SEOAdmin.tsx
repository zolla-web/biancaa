import React, { useState, useEffect } from 'react';

export interface SEOData {
  siteName: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

const defaultSEOData: SEOData = {
  siteName: "L'Odeur Exquise",
  metaTitle: "L'Odeur Exquise | Premium Luxury Fragrances",
  metaDescription: "Discover the most precious scents and liquid poetry. Our master perfumers craft exceptional fragrances for those who appreciate the finer things in life.",
  keywords: "perfume, luxury fragrance, oud, rose, amber, scents, premium perfume"
};

const SEOAdmin: React.FC = () => {
  const [data, setData] = useState<SEOData>(defaultSEOData);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('seo_data');
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      localStorage.setItem('seo_data', JSON.stringify(defaultSEOData));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('seo_data', JSON.stringify(data));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-white mb-2">SEO Settings</h1>
        <p className="text-gray-400">Optimize how your website appears in search engines like Google.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Site Name (Brand)</label>
              <input 
                type="text" 
                name="siteName"
                value={data.siteName}
                onChange={handleChange}
                placeholder="e.g. L'Odeur Exquise"
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" 
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Meta Title (Homepage)</label>
              <input 
                type="text" 
                name="metaTitle"
                value={data.metaTitle}
                onChange={handleChange}
                placeholder="e.g. Luxury Perfumes | Buy Best Fragrances Online"
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" 
              />
              <p className="text-xs text-gray-500 mt-2">Recommended length: 50-60 characters.</p>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Meta Description</label>
              <textarea 
                name="metaDescription"
                value={data.metaDescription}
                onChange={handleChange}
                rows={4}
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink resize-none" 
              />
              <p className="text-xs text-gray-500 mt-2">Recommended length: 150-160 characters.</p>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Keywords (Comma separated)</label>
              <input 
                type="text" 
                name="keywords"
                value={data.keywords}
                onChange={handleChange}
                placeholder="perfume, luxury, oud, fragrance"
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" 
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            type="submit"
            className="bg-brand-pink text-brand-chocolate px-8 py-3 rounded hover:bg-white transition-colors font-bold tracking-wide"
          >
            Save SEO Settings
          </button>
          {isSaved && <span className="text-green-400 font-bold">✓ SEO settings saved!</span>}
        </div>
      </form>
    </div>
  );
};

export default SEOAdmin;

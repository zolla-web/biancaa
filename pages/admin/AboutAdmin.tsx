import React, { useState, useEffect } from 'react';

export interface AboutData {
  title: string;
  subtitle: string;
  p1: string;
  p2: string;
  buttonText: string;
  images: string[];
}

const defaultAboutData: AboutData = {
  title: "The Art of Perfumery",
  subtitle: "Our Story",
  p1: "Founded with a passion for exceptional scents, L'Odeur Exquise brings together the world's most precious ingredients to create liquid poetry. Our master perfumers spend years perfecting each formula, ensuring a sensory journey that lingers in the memory long after the first encounter.",
  p2: "We believe that a fragrance is more than just a scent—it's an extension of your personality, an invisible accessory that completes your presence with elegance and sophistication.",
  buttonText: "Discover the Collection",
  images: [
    "https://i.pinimg.com/originals/89/dc/49/89dc496bedf1183cf35331c4a277b63c.jpg",
    "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?q=80&w=300&auto=format&fit=crop"
  ]
};

const AboutAdmin: React.FC = () => {
  const [data, setData] = useState<AboutData>(defaultAboutData);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('about_data');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Data Migration: Ensure new fields like 'images' exist
      setData({ ...defaultAboutData, ...parsed });
    } else {
      localStorage.setItem('about_data', JSON.stringify(defaultAboutData));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setIsSaved(false);
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...data.images];
    newImages[index] = value;
    setData({ ...data, images: newImages });
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('about_data', JSON.stringify(data));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-white mb-2">Edit Our Story</h1>
        <p className="text-gray-400">Update the 'About' section content on your homepage.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Text Content Section */}
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Subtitle (e.g., Our Story)</label>
              <input 
                type="text" 
                name="subtitle"
                value={data.subtitle}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" 
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Main Title</label>
              <input 
                type="text" 
                name="title"
                value={data.title}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" 
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">First Paragraph</label>
              <textarea 
                name="p1"
                value={data.p1}
                onChange={handleChange}
                rows={4}
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink resize-none" 
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Second Paragraph</label>
              <textarea 
                name="p2"
                value={data.p2}
                onChange={handleChange}
                rows={4}
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink resize-none" 
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Button Text</label>
              <input 
                type="text" 
                name="buttonText"
                value={data.buttonText}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" 
              />
            </div>
          </div>
        </div>

        {/* Images Selection Section */}
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
          <h2 className="text-xl font-serif text-white mb-6 border-b border-gray-700 pb-2">Our Story Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.images.map((img, idx) => (
              <div key={idx} className="space-y-4">
                <label className="block text-gray-400 text-sm">Image {idx + 1} URL</label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      value={img}
                      onChange={(e) => handleImageChange(idx, e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" 
                    />
                  </div>
                  <div className="w-20 h-20 rounded overflow-hidden border border-gray-700 shrink-0">
                    <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button 
            type="submit"
            className="bg-brand-pink text-brand-chocolate px-8 py-3 rounded hover:bg-white transition-colors font-bold tracking-wide"
          >
            Save Content
          </button>
          {isSaved && <span className="text-green-400 font-bold">✓ Content saved successfully!</span>}
        </div>
      </form>
    </div>
  );
};

export default AboutAdmin;

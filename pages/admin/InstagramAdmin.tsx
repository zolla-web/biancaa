import React, { useState, useEffect } from 'react';
import { Instagram, Save, Plus, Trash2, Link as LinkIcon } from 'lucide-react';

export interface InstagramData {
  username: string;
  posts: string[];
}

const defaultData: InstagramData = {
  username: "biancaperfumes",
  posts: [
    "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1602052756087-097896a36783?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?q=80&w=600&auto=format&fit=crop"
  ]
};

const InstagramAdmin: React.FC = () => {
  const [data, setData] = useState<InstagramData>(defaultData);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('instagram_data');
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      localStorage.setItem('instagram_data', JSON.stringify(defaultData));
    }
  }, []);

  const handlePostChange = (index: number, value: string) => {
    const newPosts = [...data.posts];
    newPosts[index] = value;
    setData({ ...data, posts: newPosts });
    setIsSaved(false);
  };

  const addPost = () => {
    if (data.posts.length < 6) {
      setData({ ...data, posts: [...data.posts, ''] });
      setIsSaved(false);
    }
  };

  const removePost = (index: number) => {
    const newPosts = data.posts.filter((_, i) => i !== index);
    setData({ ...data, posts: newPosts });
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('instagram_data', JSON.stringify(data));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-white mb-2">Instagram Feed</h1>
        <p className="text-gray-400">Manage your Instagram handle and the posts displayed on the homepage.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Username */}
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
          <h2 className="text-xl font-serif text-brand-pink mb-6 pb-2 border-b border-gray-700 flex items-center gap-2">
            <Instagram size={20} /> Instagram Account
          </h2>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Username (without @)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">@</span>
              <input 
                type="text" 
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 text-white pl-8 pr-4 py-3 rounded focus:outline-none focus:border-brand-pink text-lg" 
                placeholder="username"
              />
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
          <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-700">
            <h2 className="text-xl font-serif text-brand-pink flex items-center gap-2">
              <LinkIcon size={20} /> Feed Post Images
            </h2>
            <button 
              type="button"
              onClick={addPost}
              disabled={data.posts.length >= 6}
              className="flex items-center gap-1 text-sm bg-brand-pink/10 text-brand-pink px-3 py-1 rounded border border-brand-pink/20 hover:bg-brand-pink/20 disabled:opacity-50"
            >
              <Plus size={16} /> Add Image
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {data.posts.map((url, index) => (
              <div key={index} className="flex gap-4 items-center animate-fadeIn">
                <div className="flex-1">
                  <input 
                    type="url" 
                    value={url}
                    onChange={(e) => handlePostChange(index, e.target.value)}
                    placeholder="https://instagram.com/p/..."
                    className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink text-sm" 
                  />
                </div>
                {url && (
                  <div className="w-10 h-10 rounded border border-gray-700 overflow-hidden bg-gray-900 flex-shrink-0">
                    <img src={url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <button 
                  type="button"
                  onClick={() => removePost(index)}
                  className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-6 italic">Tip: Use direct image links from Instagram or a CDN for best results. Recommended grid size: 6 images.</p>
        </div>

        <div className="flex items-center gap-4">
          <button 
            type="submit"
            className="bg-brand-pink text-brand-chocolate px-8 py-3 rounded hover:bg-white transition-colors font-bold tracking-wide flex items-center gap-2"
          >
            <Save size={18} /> Save Feed
          </button>
          {isSaved && <span className="text-green-400 font-bold animate-pulse">✓ Saved successfully!</span>}
        </div>
      </form>
    </div>
  );
};

export default InstagramAdmin;

import React, { useState, useEffect } from 'react';
import { Perfume } from '../types';
import { Edit2, Trash2, Plus, X, Copy, Check } from 'lucide-react';
import { slugify } from '../utils/slugify';

const defaultPerfumes: Perfume[] = [
  { id: 1, name: "Royal Oud", description: "A majestic blend of agarwood and spices.", price: "$120", image: "https://images.unsplash.com/photo-1737424064873-89db6803084a?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 2, name: "Velvet Rose", description: "Soft petals meets dark amber.", price: "$95", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop" },
  { id: 3, name: "Ocean Mist", description: "Fresh aquatic notes with citrus.", price: "$85", image: "https://plus.unsplash.com/premium_photo-1752485892414-6656876bf49b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b2NlYW4lMjBtaXN0JTIwcGVyZnVtZXxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 4, name: "Golden Amber", description: "Warm vanilla and musk undertones.", price: "$110", image: "https://images.unsplash.com/photo-1622618991746-fe6004db3a47?q=80&w=600&auto=format&fit=crop" },
];

const defaultMenuItems: Perfume[] = [
  { id: 101, name: "Noir Intense", description: "A bold statement for the evening with dark amber.", price: "$145", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop" },
  { id: 102, name: "Citrus Bloom", description: "Energizing notes of lemon and jasmine petals.", price: "$89", image: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=600&auto=format&fit=crop" },
  { id: 103, name: "Woody Whisper", description: "Sandalwood and cedar for a calm embrace.", price: "$115", image: "https://iri7.ru/images/thumbnails/1140/1140/detailed/98/2_g2jq-mb.jpg" },
  { id: 104, name: "Vanilla Dream", description: "Sweet and comforting warmth of pure vanilla.", price: "$92", image: "https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=600&auto=format&fit=crop" },
  { id: 105, name: "Spiced Leather", description: "Rugged yet sophisticated masculine scent.", price: "$130", image: "https://i.pinimg.com/originals/bd/8a/b1/bd8ab14cf01eb8a4a71137b4668f6aa9.jpg" },
  { id: 106, name: "Pure Jasmine", description: "Simple, elegant floral essence of white flowers.", price: "$105", image: "https://avatars.mds.yandex.net/i?id=1965680693b9963b89e2343c0a814679-5490768-images-thumbs&n=13" },
  { id: 107, name: "Midnight Orchid", description: "Rare orchid notes mixed with deep berries.", price: "$160", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop" },
  { id: 108, name: "Golden Saffron", description: "Exotic spices with a touch of liquid gold.", price: "$185", image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?q=80&w=600&auto=format&fit=crop" },
  { id: 109, name: "Oceanic Breeze", description: "Crisp sea salt and fresh linen notes.", price: "$95", image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=600&auto=format&fit=crop" },
  { id: 110, name: "Rose Royale", description: "A classic bouquet of red roses and oud.", price: "$125", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop" },
  { id: 111, name: "Emerald Green", description: "Fresh cut grass and green tea accents.", price: "$80", image: "https://i.pinimg.com/originals/89/dc/49/89dc496bedf1183cf35331c4a277b63c.jpg" },
  { id: 112, name: "Velvet Musk", description: "Soft, powdery musk with a hint of iris.", price: "$110", image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=600&auto=format&fit=crop" },
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'signature' | 'menu'>('signature');
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPerfume, setEditingPerfume] = useState<Perfume | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    infoLink: '',
  });

  const getStorageKey = () => activeTab === 'signature' ? 'perfumes_data' : 'menu_products_data';

  useEffect(() => {
    const defaultData = activeTab === 'signature' ? defaultPerfumes : defaultMenuItems;
    const key = getStorageKey();
    const stored = localStorage.getItem(key);
    
    if (stored) {
      setPerfumes(JSON.parse(stored));
    } else {
      setPerfumes(defaultData);
      localStorage.setItem(key, JSON.stringify(defaultData));
    }
  }, [activeTab]);

  const saveToStorage = (updatedPerfumes: Perfume[]) => {
    setPerfumes(updatedPerfumes);
    localStorage.setItem(getStorageKey(), JSON.stringify(updatedPerfumes));
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this perfume?')) {
      // Robust filtering using String comparison to avoid any type mismatch issues
      const updated = perfumes.filter(p => String(p.id) !== String(id));
      saveToStorage(updated);
    }
  };

  const handleCopyLink = (perfume: Perfume) => {
    const url = `${window.location.origin}/product/${slugify(perfume.name)}`;
    navigator.clipboard.writeText(url);
    setCopyFeedback(perfume.id);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const openAddModal = () => {
    setEditingPerfume(null);
    setFormData({ name: '', description: '', price: '', image: '', infoLink: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (perfume: Perfume) => {
    setEditingPerfume(perfume);
    setFormData({
      name: perfume.name,
      description: perfume.description,
      price: perfume.price,
      image: perfume.image,
      infoLink: perfume.infoLink || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPerfume) {
      const updated = perfumes.map(p => 
        p.id === editingPerfume.id ? { ...p, ...formData } : p
      );
      saveToStorage(updated);
    } else {
      const newId = perfumes.length > 0 ? Math.max(...perfumes.map(p => p.id)) + 1 : 1;
      const newPerfume = { id: newId, ...formData };
      saveToStorage([...perfumes, newPerfume]);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Catalog Management</h1>
          <p className="text-gray-400">Manage your fragrances, descriptions, and prices across different collections.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-brand-pink text-brand-chocolate px-6 py-3 rounded hover:bg-white transition-colors font-bold uppercase tracking-wider text-sm"
        >
          <Plus size={18} />
          Add Perfume
        </button>
      </div>

      <div className="flex gap-4 mb-6 border-b border-gray-700 pb-2">
        <button
          onClick={() => setActiveTab('signature')}
          className={`px-4 py-2 font-bold tracking-wider rounded-t transition-colors ${activeTab === 'signature' ? 'text-brand-pink border-b-2 border-brand-pink' : 'text-gray-400 hover:text-white'}`}
        >
          Signature Scents
        </button>
        <button
          onClick={() => setActiveTab('menu')}
          className={`px-4 py-2 font-bold tracking-wider rounded-t transition-colors ${activeTab === 'menu' ? 'text-brand-pink border-b-2 border-brand-pink' : 'text-gray-400 hover:text-white'}`}
        >
          The Menu Products
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-900 border-b border-gray-700 text-gray-400 uppercase text-xs tracking-wider">
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {perfumes.map(perfume => (
              <tr key={perfume.id} className="hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-16 h-16 rounded overflow-hidden">
                    <img src={perfume.image} alt={perfume.name} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-6 py-4 font-serif text-lg text-white">{perfume.name}</td>
                <td className="px-6 py-4 text-gray-400 text-sm max-w-xs truncate">{perfume.description}</td>
                <td className="px-6 py-4 text-brand-pink">{perfume.price}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => handleCopyLink(perfume)}
                      title="Copy Product Link"
                      className={`p-2 transition-colors rounded ${copyFeedback === perfume.id ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white bg-gray-700'}`}
                    >
                      {copyFeedback === perfume.id ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                    <button 
                      onClick={() => openEditModal(perfume)}
                      className="p-2 text-gray-400 hover:text-white transition-colors bg-gray-700 rounded"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(perfume.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-700 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {perfumes.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No perfumes found. Add one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-xl font-serif text-white">
                {editingPerfume ? 'Edit Perfume' : 'Add New Perfume'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Price (e.g. $120)</label>
                <input 
                  type="text" 
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Description</label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink h-24 resize-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Image URL</label>
                <input 
                  type="url" 
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Info Link / Buy URL (Optional)</label>
                <input 
                  type="url" 
                  placeholder="https://example.com/product"
                  value={formData.infoLink}
                  onChange={(e) => setFormData({...formData, infoLink: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink"
                />
              </div>

              <div className="pt-4 flex justify-end gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-brand-pink text-brand-chocolate px-6 py-2 rounded hover:bg-white transition-colors font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

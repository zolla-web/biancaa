import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, X } from 'lucide-react';

export interface Offer {
  id: number;
  title: string;
  discount: string;
  desc: string;
  bg: string;
  image: string;
}

const defaultOffers: Offer[] = [
  {
    id: 1,
    title: "Student Special",
    discount: "25% OFF",
    desc: "Valid with student ID on all fresh scents.",
    bg: "from-blue-900 to-black",
    image: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Family Bundle",
    discount: "Buy 2 Get 1",
    desc: "Perfect for gifts and sharing love.",
    bg: "from-brand-chocolate to-black",
    image: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Business Class",
    discount: "Corporate Gifts",
    desc: "Exclusive packaging for bulk orders.",
    bg: "from-emerald-900 to-black",
    image: "https://images.unsplash.com/photo-1602052756087-097896a36783?q=80&w=600&auto=format&fit=crop"
  }
];

const OffersAdmin: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    discount: '',
    desc: '',
    bg: 'from-brand-chocolate to-black',
    image: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('offers_data');
    if (stored) {
      setOffers(JSON.parse(stored));
    } else {
      setOffers(defaultOffers);
      localStorage.setItem('offers_data', JSON.stringify(defaultOffers));
    }
  }, []);

  const saveToStorage = (updatedOffers: Offer[]) => {
    setOffers(updatedOffers);
    localStorage.setItem('offers_data', JSON.stringify(updatedOffers));
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      saveToStorage(offers.filter(o => o.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingOffer(null);
    setFormData({ title: '', discount: '', desc: '', bg: 'from-brand-chocolate to-black', image: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      discount: offer.discount,
      desc: offer.desc,
      bg: offer.bg,
      image: offer.image,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOffer) {
      saveToStorage(offers.map(o => o.id === editingOffer.id ? { ...o, ...formData } : o));
    } else {
      const newId = offers.length > 0 ? Math.max(...offers.map(o => o.id)) + 1 : 1;
      saveToStorage([...offers, { id: newId, ...formData }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Special Offers</h1>
          <p className="text-gray-400">Manage the promotional cards on your homepage.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-brand-pink text-brand-chocolate px-6 py-3 rounded hover:bg-white transition-colors font-bold uppercase tracking-wider text-sm"
        >
          <Plus size={18} /> Add Offer
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-900 border-b border-gray-700 text-gray-400 uppercase text-xs tracking-wider">
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Discount</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {offers.map(offer => (
              <tr key={offer.id} className="hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-16 h-16 rounded overflow-hidden">
                    <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-6 py-4 font-serif text-lg text-white">{offer.title}</td>
                <td className="px-6 py-4 font-bold text-brand-pink">{offer.discount}</td>
                <td className="px-6 py-4 text-gray-400 text-sm">{offer.desc}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => openEditModal(offer)} className="p-2 text-gray-400 hover:text-white transition-colors bg-gray-700 rounded"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(offer.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-700 rounded"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {offers.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No offers found. Add one to get started.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-xl font-serif text-white">{editingOffer ? 'Edit Offer' : 'Add New Offer'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Title</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Discount (e.g. 25% OFF)</label>
                <input type="text" required value={formData.discount} onChange={(e) => setFormData({...formData, discount: e.target.value})} className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Description</label>
                <textarea required value={formData.desc} onChange={(e) => setFormData({...formData, desc: e.target.value})} className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink h-24 resize-none" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Background Gradient</label>
                <select value={formData.bg} onChange={(e) => setFormData({...formData, bg: e.target.value})} className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink">
                  <option value="from-brand-chocolate to-black">Chocolate Dark</option>
                  <option value="from-blue-900 to-black">Midnight Blue</option>
                  <option value="from-emerald-900 to-black">Emerald Green</option>
                  <option value="from-purple-900 to-black">Deep Purple</option>
                  <option value="from-red-900 to-black">Ruby Red</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Image URL</label>
                <input type="url" required value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" />
              </div>

              <div className="pt-4 flex justify-end gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-gray-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="bg-brand-pink text-brand-chocolate px-6 py-2 rounded hover:bg-white transition-colors font-bold">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default OffersAdmin;

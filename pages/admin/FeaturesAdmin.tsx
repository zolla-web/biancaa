import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, X, Star, Leaf, Droplet, Truck, Heart, Shield, Award, Zap } from 'lucide-react';

export interface Feature {
  id: number;
  iconName: string;
  title: string;
  desc: string;
}

const defaultFeatures: Feature[] = [
  { id: 1, iconName: "Star", title: "Premium Quality", desc: "Sourced from the finest ingredients worldwide." },
  { id: 2, iconName: "Leaf", title: "100% Organic", desc: "Natural extracts without harmful synthetics." },
  { id: 3, iconName: "Droplet", title: "Long Lasting", desc: "High concentration oils that stay all day." },
  { id: 4, iconName: "Truck", title: "Fast Delivery", desc: "Secure packaging and rapid shipping." },
];

const availableIcons = [
  { name: "Star", component: <Star size={24} /> },
  { name: "Leaf", component: <Leaf size={24} /> },
  { name: "Droplet", component: <Droplet size={24} /> },
  { name: "Truck", component: <Truck size={24} /> },
  { name: "Heart", component: <Heart size={24} /> },
  { name: "Shield", component: <Shield size={24} /> },
  { name: "Award", component: <Award size={24} /> },
  { name: "Zap", component: <Zap size={24} /> },
];

const FeaturesAdmin: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);

  const [formData, setFormData] = useState({
    iconName: 'Star',
    title: '',
    desc: ''
  });

  useEffect(() => {
    const stored = localStorage.getItem('features_data');
    if (stored) {
      setFeatures(JSON.parse(stored));
    } else {
      setFeatures(defaultFeatures);
      localStorage.setItem('features_data', JSON.stringify(defaultFeatures));
    }
  }, []);

  const saveToStorage = (updatedFeatures: Feature[]) => {
    setFeatures(updatedFeatures);
    localStorage.setItem('features_data', JSON.stringify(updatedFeatures));
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      saveToStorage(features.filter(f => f.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingFeature(null);
    setFormData({ iconName: 'Star', title: '', desc: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (feature: Feature) => {
    setEditingFeature(feature);
    setFormData({
      iconName: feature.iconName,
      title: feature.title,
      desc: feature.desc
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFeature) {
      saveToStorage(features.map(f => f.id === editingFeature.id ? { ...f, ...formData } : f));
    } else {
      const newId = features.length > 0 ? Math.max(...features.map(f => f.id)) + 1 : 1;
      saveToStorage([...features, { id: newId, ...formData }]);
    }
    setIsModalOpen(false);
  };

  const getIconComponent = (iconName: string) => {
    const icon = availableIcons.find(i => i.name === iconName);
    return icon ? icon.component : <Star size={24} />;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Right Choice</h1>
          <p className="text-gray-400">Manage the core features and benefits section.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-brand-pink text-brand-chocolate px-6 py-3 rounded hover:bg-white transition-colors font-bold uppercase tracking-wider text-sm"
        >
          <Plus size={18} /> Add Feature
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-900 border-b border-gray-700 text-gray-400 uppercase text-xs tracking-wider">
              <th className="px-6 py-4">Icon</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {features.map(feature => (
              <tr key={feature.id} className="hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 text-brand-pink">
                  <div className="bg-white/5 p-2 rounded-full inline-block">
                    {getIconComponent(feature.iconName)}
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-white">{feature.title}</td>
                <td className="px-6 py-4 text-gray-400 text-sm">{feature.desc}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => openEditModal(feature)} className="p-2 text-gray-400 hover:text-white transition-colors bg-gray-700 rounded"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(feature.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-700 rounded"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {features.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No features found. Add one to get started.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-xl font-serif text-white">{editingFeature ? 'Edit Feature' : 'Add New Feature'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Title</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Description</label>
                <textarea required value={formData.desc} onChange={(e) => setFormData({...formData, desc: e.target.value})} className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink h-24 resize-none" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Icon</label>
                <div className="grid grid-cols-4 gap-4 mt-2">
                  {availableIcons.map(icon => (
                    <div 
                      key={icon.name}
                      onClick={() => setFormData({...formData, iconName: icon.name})}
                      className={`cursor-pointer p-3 rounded flex flex-col items-center justify-center border transition-colors ${formData.iconName === icon.name ? 'border-brand-pink bg-brand-pink/10 text-brand-pink' : 'border-gray-700 text-gray-400 hover:bg-gray-800'}`}
                    >
                      {icon.component}
                      <span className="text-[10px] mt-2 mt-1">{icon.name}</span>
                    </div>
                  ))}
                </div>
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
export default FeaturesAdmin;

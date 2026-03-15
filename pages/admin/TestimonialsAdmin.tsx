import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, X } from 'lucide-react';
import { Testimonial } from '../../types';

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Regular Customer",
    content: "The scent profile is unlike anything I've found on the high street. Truly unique.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Perfume Enthusiast",
    content: "Exceptional packaging and delivery. The 'Noir Intense' is now my signature daily wear.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Emma Thompson",
    role: "Fashion Blogger",
    content: "A hidden gem. The floral notes are delicate yet powerful. Highly recommended!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop"
  }
];

const TestimonialsAdmin: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    image: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('testimonials_data');
    if (stored) {
      setTestimonials(JSON.parse(stored));
    } else {
      setTestimonials(defaultTestimonials);
      localStorage.setItem('testimonials_data', JSON.stringify(defaultTestimonials));
    }
  }, []);

  const saveToStorage = (updatedList: Testimonial[]) => {
    setTestimonials(updatedList);
    localStorage.setItem('testimonials_data', JSON.stringify(updatedList));
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      saveToStorage(testimonials.filter(t => t.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingTestimonial(null);
    setFormData({ name: '', role: '', content: '', image: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (t: Testimonial) => {
    setEditingTestimonial(t);
    setFormData({
      name: t.name,
      role: t.role,
      content: t.content,
      image: t.image,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTestimonial) {
      saveToStorage(testimonials.map(t => t.id === editingTestimonial.id ? { ...t, ...formData } : t));
    } else {
      const newId = testimonials.length > 0 ? Math.max(...testimonials.map(t => t.id)) + 1 : 1;
      saveToStorage([...testimonials, { id: newId, ...formData }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Testimonials</h1>
          <p className="text-gray-400">Manage customer reviews and feedback.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-brand-pink text-brand-chocolate px-6 py-3 rounded hover:bg-white transition-colors font-bold uppercase tracking-wider text-sm"
        >
          <Plus size={18} /> Add Review
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-900 border-b border-gray-700 text-gray-400 uppercase text-xs tracking-wider">
              <th className="px-6 py-4">Avatar</th>
              <th className="px-6 py-4">Customer Name</th>
              <th className="px-6 py-4">Quote</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {testimonials.map(t => (
              <tr key={t.id} className="hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-brand-pink">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-white mb-1">{t.name}</div>
                  <div className="text-brand-pink text-xs">{t.role}</div>
                </td>
                <td className="px-6 py-4 text-gray-400 text-sm italic max-w-md">"{t.content}"</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => openEditModal(t)} className="p-2 text-gray-400 hover:text-white transition-colors bg-gray-700 rounded"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(t.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-700 rounded"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No testimonials found. Add one to get started.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-xl font-serif text-white">{editingTestimonial ? 'Edit Review' : 'Add New Review'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Customer Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Role/Title</label>
                <input type="text" required value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Quote</label>
                <textarea required value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink h-24 resize-none" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Avatar Image URL</label>
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
export default TestimonialsAdmin;

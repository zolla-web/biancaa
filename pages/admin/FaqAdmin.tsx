import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, X } from 'lucide-react';
import { FaqItem } from '../../types';

const defaultFaqs: FaqItem[] = [
  { question: "Are your perfumes long-lasting?", answer: "Yes, we use high concentration 'Eau de Parfum' oils to ensure the scent lingers for 8-12 hours." },
  { question: "Do you offer international shipping?", answer: "Currently we ship within the UK and select European countries." },
  { question: "Can I return an opened bottle?", answer: "Due to hygiene reasons, we cannot accept returns on opened products unless faulty." },
  { question: "Are your ingredients vegan?", answer: "Yes, 100% of our collection is vegan and cruelty-free." },
];

const FaqAdmin: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('faqs_data');
    if (stored) {
      setFaqs(JSON.parse(stored));
    } else {
      setFaqs(defaultFaqs);
      localStorage.setItem('faqs_data', JSON.stringify(defaultFaqs));
    }
  }, []);

  const saveToStorage = (updatedFaqs: FaqItem[]) => {
    setFaqs(updatedFaqs);
    localStorage.setItem('faqs_data', JSON.stringify(updatedFaqs));
  };

  const handleDelete = (index: number) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      saveToStorage(faqs.filter((_, i) => i !== index));
    }
  };

  const openAddModal = () => {
    setEditingIndex(null);
    setFormData({ question: '', answer: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (faq: FaqItem, index: number) => {
    setEditingIndex(index);
    setFormData({
      question: faq.question,
      answer: faq.answer,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...faqs];
      updated[editingIndex] = formData;
      saveToStorage(updated);
    } else {
      saveToStorage([...faqs, formData]);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Frequently Asked Questions</h1>
          <p className="text-gray-400">Manage your Q&A section.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-brand-pink text-brand-chocolate px-6 py-3 rounded hover:bg-white transition-colors font-bold uppercase tracking-wider text-sm"
        >
          <Plus size={18} /> Add FAQ
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-900 border-b border-gray-700 text-gray-400 uppercase text-xs tracking-wider">
              <th className="px-6 py-4 w-1/3">Question</th>
              <th className="px-6 py-4 w-1/2">Answer</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {faqs.map((faq, index) => (
              <tr key={index} className="hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 font-serif text-lg text-brand-pink align-top">{faq.question}</td>
                <td className="px-6 py-4 text-gray-300 text-sm align-top">{faq.answer}</td>
                <td className="px-6 py-4 text-right align-top">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => openEditModal(faq, index)} className="p-2 text-gray-400 hover:text-white transition-colors bg-gray-700 rounded"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(index)} className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-700 rounded"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {faqs.length === 0 && (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No FAQs found. Add one to get started.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-xl font-serif text-white">{editingIndex !== null ? 'Edit FAQ' : 'Add New FAQ'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Question</label>
                <input type="text" required value={formData.question} onChange={(e) => setFormData({...formData, question: e.target.value})} className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink" />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Answer</label>
                <textarea required value={formData.answer} onChange={(e) => setFormData({...formData, answer: e.target.value})} className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-brand-pink h-32 resize-none" />
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
export default FaqAdmin;

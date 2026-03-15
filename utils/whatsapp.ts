import { slugify } from "./slugify";

export const getWhatsAppUrl = (productName: string, productPath?: string) => {
  const stored = localStorage.getItem('global_settings');
  const settings = stored ? JSON.parse(stored) : { 
    whatsappNumber: "447848893414", 
    whatsappOrderMessage: "Bonjour, est-ce que ce produit est disponible ?" 
  };
  
  const greeting = settings.whatsappOrderMessage || "Bonjour, est-ce que ce produit est disponible ?";
  const phone = settings.whatsappNumber || "447848893414";
  
  // Construct absolute URL using slug if path is not provided or to ensure slug format
  const baseUrl = window.location.origin;
  const targetPath = productPath || `/product/${slugify(productName)}`;
  const fullUrl = `${baseUrl}${targetPath}`;
  
  const message = `${greeting} ${productName} ${fullUrl}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

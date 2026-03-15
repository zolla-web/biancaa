export interface Perfume {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category?: string;
  infoLink?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface NavLink {
  name: string;
  href: string;
}
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  images: string[];
  badge?: string;
  stock: number;
  featured: boolean;
  rating: number;
  reviewCount: number;
}

export interface Course {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  image?: string;
  features: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image?: string;
  published: boolean;
  views: number;
  createdAt: Date;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  image?: string;
  role: "USER" | "ADMIN" | "MODERATOR";
}

export interface Order {
  id: string;
  userId: string;
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";
  total: number;
  paymentMethod?: string;
  couponCode?: string;
  discount: number;
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SensitivityConfig {
  device: string;
  dpi: number;
  screenSize: number;
  fps: number;
  playStyle: string;
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  freeLook: number;
}

export interface CommunityProfile {
  id: string;
  userId: string;
  username: string;
  bio?: string;
  device?: string;
  dpi?: number;
  playStyle?: string;
  rank?: string;
  points: number;
}

// src/types.ts

export type Subcategory =
  | 'Vegetables'
  | 'Salads & Greens'
  | 'Pantry & Artisanal'
  | 'Meats & Eggs'
  | 'Baked Goods'
  | 'Apparel & Goods'
  | 'Adult Beverages';

export interface Product {
  id: string;
  name: string;
  category: Subcategory;
  price: number;
  unit: string;
  image: string;
  description: string;
  tasteProfile?: string;
  isAgeRestricted?: boolean;
  abv?: string;
  barcode?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CompletedOrder {
  orderId: string;
  timestamp: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  fulfillmentMode: 'pickup' | 'delivery';
  paymentType: 'card' | 'cash';
}

export interface SavedCard {
  id: string;
  cardNumber: string;
  expDate: string;
  cardHolder: string;
}

export interface UserProfile {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  phone: string;
  birthdate: string;
  subscribePromotions: boolean;
  savedCards: SavedCard[];
  rewardPoints: number; // Rewards Program
}
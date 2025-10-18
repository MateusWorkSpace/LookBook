export interface LookbookItem {
  id: string;
  imageUrl: string;
  name: string;
  price: string;
}

export interface Lookbook {
  id: string;
  title: string;
  description: string;
  items: LookbookItem[];
  createdAt: string;
  shareableLink?: string;
}

export interface ShopperProfile {
  name: string;
  whatsappNumber: string;
  email: string;
  subscription_status?: 'free' | 'pro';
}

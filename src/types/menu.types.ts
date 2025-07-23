export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  dietary: string[];
  spiceLevel?: number;
  featured?: boolean;
}

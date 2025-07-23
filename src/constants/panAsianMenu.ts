import { MenuItem } from "../components/Menu";

export const panAsianMenu: MenuItem[] = [
  // Japan
  {
    id: "pa-jp-ap-1",
    name: "Edamame",
    description: "Steamed & Salted Soybeans",
    price: 6,
    category: "japan",
    dietary: ["vegetarian", "gluten-free"],
  },
  {
    id: "pa-jp-ap-2",
    name: "Agedashi Tofu",
    description: "Lightly Fried Tofu in Dashi Broth",
    price: 8,
    category: "japan",
    dietary: ["vegetarian"],
  },
  {
    id: "pa-jp-ap-3",
    name: "Gyoza",
    description: "Pan-Fried Pork or Vegetable Dumplings",
    price: 9,
    category: "japan",
    dietary: [],
  },
  {
    id: "pa-jp-mc-1",
    name: "Chicken Teriyaki",
    description: "Grilled chicken with a sweet and savory teriyaki glaze",
    price: 18,
    category: "japan",
    dietary: [],
  },

  // China
  {
    id: "pa-cn-ap-1",
    name: "Siu Mai",
    description: "Pork and Shrimp Dumplings",
    price: 10,
    category: "china",
    dietary: [],
  },
  {
    id: "pa-cn-ap-2",
    name: "Har Gow",
    description: "Shrimp Dumplings",
    price: 11,
    category: "china",
    dietary: [],
  },
  {
    id: "pa-cn-mc-1",
    name: "Peking Duck",
    description: "with Pancakes, Scallions, and Hoisin Sauce",
    price: 45,
    category: "china",
    dietary: [],
    featured: true,
  },
  {
    id: "pa-cn-mc-2",
    name: "Kung Pao Chicken",
    description: "Spicy stir-fried chicken with peanuts, vegetables, and chili peppers",
    price: 19,
    category: "china",
    dietary: [],
    spiceLevel: 2,
  },

  // Korea
  {
    id: "pa-kr-ap-1",
    name: "Kimchi Jeon",
    description: "Kimchi Pancake",
    price: 12,
    category: "korea",
    dietary: ["vegetarian"],
    spiceLevel: 1,
  },
  {
    id: "pa-kr-bbq-1",
    name: "Bulgogi",
    description: "Marinated Beef, grilled at the table",
    price: 25,
    category: "korea",
    dietary: [],
  },
  {
    id: "pa-kr-mc-1",
    name: "Bibimbap",
    description: "Mixed Rice with Vegetables, Meat, and Egg",
    price: 20,
    category: "korea",
    dietary: [],
  },

  // Thailand
  {
    id: "pa-th-ap-1",
    name: "Satay Gai",
    description: "Chicken Satay with Peanut Sauce",
    price: 13,
    category: "thailand",
    dietary: [],
  },
  {
    id: "pa-th-sp-1",
    name: "Tom Yum Goong",
    description: "Spicy Shrimp Soup",
    price: 10,
    category: "thailand",
    dietary: ["gluten-free"],
    spiceLevel: 3,
  },
  {
    id: "pa-th-mc-1",
    name: "Pad Thai",
    description: "Stir-fried Rice Noodles with Shrimp or Chicken",
    price: 18,
    category: "thailand",
    dietary: [],
  },

  // Vietnam
  {
    id: "pa-vn-ap-1",
    name: "Goi Cuon",
    description: "Fresh Spring Rolls with Shrimp and Pork",
    price: 9,
    category: "vietnam",
    dietary: ["gluten-free"],
  },
  {
    id: "pa-vn-sp-1",
    name: "Pho Bo",
    description: "Beef Noodle Soup",
    price: 16,
    category: "vietnam",
    dietary: [],
  },
  {
    id: "pa-vn-sw-1",
    name: "Banh Mi",
    description: "Vietnamese Baguette with Grilled Pork, Pâté, and Vegetables",
    price: 14,
    category: "vietnam",
    dietary: [],
  },

  // India
  {
    id: "pa-in-ap-1",
    name: "Samosa",
    description: "Vegetable or Lamb",
    price: 7,
    category: "india",
    dietary: ["vegetarian"],
  },
  {
    id: "pa-in-mc-1",
    name: "Butter Chicken",
    description: "Murgh Makhani - a creamy, tangy, and sweet chicken curry",
    price: 22,
    category: "india",
    dietary: [],
    featured: true,
  },
  {
    id: "pa-in-rc-1",
    name: "Biryani",
    description: "Vegetable, Chicken, or Lamb",
    price: 19,
    category: "india",
    dietary: [],
  },

  // Malaysia & Singapore
  {
    id: "pa-my-mc-1",
    name: "Laksa",
    description: "Spicy Coconut Noodle Soup",
    price: 17,
    category: "malaysia-singapore",
    dietary: [],
    spiceLevel: 2,
  },
  {
    id: "pa-my-mc-2",
    name: "Hainanese Chicken Rice",
    description: "Poached chicken and seasoned rice, served with chili sauce",
    price: 18,
    category: "malaysia-singapore",
    dietary: [],
  },

  // Desserts
  {
    id: "pa-ds-1",
    name: "Mochi Ice Cream",
    description: "Japanese rice cake with an ice cream filling",
    price: 8,
    category: "desserts-asia",
    dietary: ["vegetarian", "gluten-free"],
  },
  {
    id: "pa-ds-2",
    name: "Mango Sticky Rice",
    description: "Classic Thai dessert with sweet sticky rice, fresh mango, and coconut milk",
    price: 10,
    category: "desserts-asia",
    dietary: ["vegetarian", "gluten-free"],
  },

  // Beverages
  {
    id: "pa-bv-1",
    name: "Thai Iced Tea",
    description: "Sweet and creamy black tea beverage",
    price: 5,
    category: "beverages-asia",
    dietary: ["vegetarian"],
  },
  {
    id: "pa-bv-2",
    name: "Mango Lassi",
    description: "A popular and traditional yogurt-based drink from India",
    price: 6,
    category: "beverages-asia",
    dietary: ["vegetarian"],
  },
];

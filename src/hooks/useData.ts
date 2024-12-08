import { ref } from "vue";

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  feature: string;
}

export function useProductData() {
  const products = ref<Product[]>([]);

  const generateData = (): Product[] => {
    const categories = ["Electronics", "Home Appliances", "Fashion", "Books", "Toys", "Sports"];
    const features = ["Durable", "Eco-Friendly", "Premium Quality", "Budget Friendly", "Lightweight", "Compact"];
    const names = [
      "Smartphone", "Laptop", "Headphones", "Blender", "Microwave", "T-shirt",
      "Sneakers", "Backpack", "Novel", "Action Figure", "Soccer Ball", "Yoga Mat"
    ];

    const data: Product[] = [];

    for (let i = 1; i <= 500; i++) {
      const id = `ID-${i.toString().padStart(4, '0')}`;
      const name = `${names[Math.floor(Math.random() * names.length)]} #${i}`;
      const price = `$${(Math.random() * 100 + 10).toFixed(2)}`;
      const category = categories[Math.floor(Math.random() * categories.length)];
      const feature = features[Math.floor(Math.random() * features.length)];

      data.push({ id, name, price, category, feature });
    }

    return data;
  };

  products.value = generateData(); // 在调用时立即生成数据

  return { products };
}

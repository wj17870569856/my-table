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
    const categories = ["电子产品", "家用电器", "时尚", "Books", "Toys", "Sports"];
    const features = ["耐用", "环保", "优质", "便宜", "Lightweight", "Compact"];
    const names = [
      "智能手机", "笔记本电脑", "耳机", "搅拌机", "Microwave", "T-shirt",
      "运动鞋", "Backpack", "Novel", "玩偶", "Soccer Ball", "瑜伽垫"
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

import { useState, useEffect } from "react";
import { ICategoryWithItems } from "types/Category";



export default function useProductsToCategories<T>(products: T[], dependency?: Array<any>) {
  const [categories, setCategories] = useState<ICategoryWithItems<T>[]>([]);
  
  if (!dependency) dependency = products;

  useEffect(() => {
    let tmp: ICategoryWithItems<T>[] = [];

    products.forEach((product: any) => {
      let category = tmp.find(
        (category) => category.name === product.category.name
      );
      category && category.items.push(product);
      !category && tmp.push({ ...product.category, items: [product] });
    });

    setCategories([...tmp]);
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependency]);

  return categories;
}

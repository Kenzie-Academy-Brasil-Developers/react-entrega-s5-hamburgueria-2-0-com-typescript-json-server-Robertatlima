import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "../../interfaceProduct/products";

interface ProductListProps {
  children: ReactNode;
}

interface ProductListProviderData {
  ProductList: Product[];
  getProductList: () => void;
}

const ProductListContext = createContext<ProductListProviderData>(
  {} as ProductListProviderData
);

export const ProductListProvider = ({ children }: ProductListProps) => {
  const [ProductList, setProductList] = useState<Product[]>([] as Product[]);

  const getProductList = () => {
    axios
      .get("https://jsonkenzie-burg.herokuapp.com/products")
      .then((response) => {
        setProductList(response.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <ProductListContext.Provider value={{ ProductList, getProductList }}>
      {children}
    </ProductListContext.Provider>
  );
};
export const useProductList = () => useContext(ProductListContext);

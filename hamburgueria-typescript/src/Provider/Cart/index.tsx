import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";

import { Product } from "../../interfaceProduct/products";
import { useAuth } from "../Auth";

interface CartProps {
  children: ReactNode;
}

interface CartProviderData {
  Cart: Product[];
  getCart: () => void;
  addCart: (item: Product) => void;
  removeCart: (item: Product) => void;
}

const CartContext = createContext<CartProviderData>({} as CartProviderData);

export const CartProvider = ({ children }: CartProps) => {
  const [Cart, setCart] = useState<Product[]>([] as Product[]);

  const { userid } = useAuth();
  const { authToken } = useAuth();

  const getCart = () => {
    axios
      .get(`https://jsonkenzie-burg.herokuapp.com/cart?userId=${userid}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setCart(response.data);
      })
      .catch((err) => console.log("err"));
  };

  const addCart = (item: Product) => {
    axios
      .post(`https://jsonkenzie-burg.herokuapp.com/cart`, item, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        getCart();
      })
      .catch((err) => console.log(err));
  };

  const removeCart = (item: Product) => {
    axios
      .delete(`https://jsonkenzie-burg.herokuapp.com/cart/${item.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(() => {
        getCart();
      });
  };

  return (
    <CartContext.Provider value={{ removeCart, addCart, Cart, getCart }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);

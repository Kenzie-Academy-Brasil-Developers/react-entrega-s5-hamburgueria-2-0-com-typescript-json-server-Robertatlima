import { ReactNode } from "react";
import { AuthProvider } from "./Auth";
import { CartProvider } from "./Cart";
import { ProductListProvider } from "./ProductList";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ProductListProvider>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </ProductListProvider>
  );
};

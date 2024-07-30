import { ReactNode, createContext, useState } from "react";
import { ProductsType } from "../Types/ProductsTypes";

export type CartItemType = {
  product: ProductsType;
  amount: number;
};

export type CartContextType = {
  updateCart: (num: number, prod: ProductsType) => void;
  cart: CartItemType[];
  nom: CartItemType[];
  clearCart: () => void;
  handlLessMOre: () => void;
};

export const CartContext = createContext<null | CartContextType>(null);

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [nom, setNom] = useState<CartItemType[]>([]);

  const handlLessMOre = ()=> {
    if(cart.length > 1 || cart.length === 1){
      setNom([cart[0]])
    }else{
      setCart(cart)
    }
  }

  const clearCart = () => {
    setCart([]);
  };

  const updateCart = (num: number, prod: ProductsType) => {

    if (num === 0) {
      const newCart = cart.filter(
        (currItem) => currItem.product.id !== prod.id
      );
      setCart(newCart);
    }

    if (num > 0) {
      const item = cart.find((currItem) => currItem.product.id === prod.id);

      if (item) {
        const newCart = cart.map((currItem) =>
          currItem.product.id !== prod.id
            ? currItem
            : { ...currItem, amount: num }
        );
        setCart(newCart);
      } else {
        setCart([...cart, { amount: num, product: prod }]);
      }
    }
  };

  
  return (
    <CartContext.Provider value={{ cart, updateCart, clearCart, handlLessMOre, nom }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
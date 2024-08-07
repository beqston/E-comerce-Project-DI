import { ReactNode, createContext, useEffect, useState } from "react";
import { ProductsType } from "../Types/ProductsTypes";


export type CartItemType = {
  product: ProductsType;
  amount: number;
};

export type CartContextType = {
  updateCart: (num: number, prod: ProductsType) => void;
  cart: CartItemType[];
  succsesArr: CartItemType[];
  clearCart: () => void;
  handlLessMOre: () => void;
};

export const CartContext = createContext<null | CartContextType>(null);

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [succsesArr, setSuccsesArr] = useState<CartItemType[]>([]);

  useEffect(()=> {
    if(JSON.parse(localStorage.getItem("saveItem") || '[]')){
      setCart(JSON.parse(localStorage.getItem("saveItem") || '[]'))
    }
  },[])

  const handlLessMOre = ()=> {
    if(cart.length > 1 || cart.length === 1){
      setSuccsesArr([cart[0]])
    }
  }

  const clearCart = () => {
    setCart([]);
    localStorage.setItem("saveItem", JSON.stringify([]))
  };

  const updateCart = (num: number, prod: ProductsType) => {

    if (num === 0) {
      const newCart = cart.filter(
        (currItem) => currItem.product.id !== prod.id
      );
      setCart(newCart);
      localStorage.setItem("saveItem", JSON.stringify(newCart))
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
        localStorage.setItem("saveItem", JSON.stringify(newCart))

      } else {
        const newCart =[...cart, { amount: num, product: prod }] 
        setCart(newCart);
        localStorage.setItem("saveItem", JSON.stringify(newCart))  
      }
    }
  };

  
  return (
    <CartContext.Provider value={{ cart, updateCart, clearCart, handlLessMOre, succsesArr }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
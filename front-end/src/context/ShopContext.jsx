import { createContext, useContext } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = "$";
    const delivery_fee = 10;

    return <ShopContext.Provider value={{ products, currency, delivery_fee }}>{children}</ShopContext.Provider>;
}

export default ShopContextProvider;

export const useShop = ()=>useContext(ShopContext); 
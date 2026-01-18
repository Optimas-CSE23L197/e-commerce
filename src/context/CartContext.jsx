import { createContext, useContext, useState } from "react";

const CartContext = createContext()

export default function CartProvider({ children }) {
    const [cart, setCart] = useState([])

    // add product to cart
    const handleAddToCart = (product) => {
        // store all existing product plus store new product
        setCart((prev) => {
            const existingProduct = prev.find((item) => item.id === product.id);

            if (existingProduct) {
                const updatedCart = prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
                return updatedCart;
            } else {
                const newCart = [...prev, { ...product, qty: 1 }]
                return newCart;
            }
        })
    }

    // remove from cart
    const handleRemoveFromCart = (product) => {
        setCart((prev) => {
            const updatedCart = prev.filter((item) => item.id !== product.id);
            return updatedCart;
        })
    }

    // handle qty
    const increaseQty = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, qty: item.qty + 1 } : item
            )
        );
    };

    const decreseQty = (id) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.id === id ? { ...item, qty: item.qty - 1 } : item
                )
                .filter((item) => item.qty > 0)
        );
    };


    // calculate total price
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const deliveryCharge = cart.length > 0 ? 2 : 0;
    const tax = totalPrice * 0.05;
    const finalPrice = cart.length > 0 ? totalPrice + deliveryCharge + tax : 0;

    const value = {
        cart, totalPrice, deliveryCharge, tax, finalPrice, handleAddToCart, handleRemoveFromCart, increaseQty, decreseQty
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);
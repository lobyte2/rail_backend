import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();


const getInitialCart = () => {
    try {
        const storedCart = localStorage.getItem('cart');

        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.error("Error al leer el carrito del localStorage", error);
        return [];
    }
};

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(getInitialCart);


    useEffect(() => {
        try {

            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error("No se pudo guardar el carrito en el localStorage", error);
        }
    }, [cart]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {

                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
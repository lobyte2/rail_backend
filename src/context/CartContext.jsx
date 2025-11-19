import { createContext, useState, useEffect, useContext } from 'react';
import { getCart, addToCartApi, removeFromCartApi, checkoutCart } from '../api/db';//Agregamos 'checkoutCart' aquí abajo
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, user } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated && user) {
            setLoading(true);
            getCart()
                .then(setCart)
                .catch(err => {
                    console.error("Error al cargar el carrito:", err.message);
                    setCart([]);
                })
                .finally(() => setLoading(false));
        } else {
            setCart([]);
        }
    }, [isAuthenticated, user]);

    const addToCart = async (product) => {
        if (!isAuthenticated) {
            alert('Debes iniciar sesión para agregar productos al carrito');
            return;
        }
        try {
            const updatedCart = await addToCartApi(product);
            setCart(updatedCart);
        } catch (error) {
            console.error("Error al agregar al carrito:", error.message);
        }
    };

    const removeFromCart = async (productId) => {
        if (!isAuthenticated) return;
        try {
            const updatedCart = await removeFromCartApi(productId);
            setCart(updatedCart);
        } catch (error) {
            console.error("Error al eliminar del carrito:", error.message);
        }
    };

    // Pagar / Vaciar Carrito 
    const pagar = async () => {
        if (!isAuthenticated) return;
        try {
            await checkoutCart(); // Llama al backend
            setCart([]); // Limpia el estado visual
            alert("¡Compra realizada con éxito!");
        } catch (error) {
            console.error("Error al pagar:", error.message);
            alert("Hubo un error al procesar tu compra.");
        }
    };

    return (
        // Agregamos 'pagar' al value del provider
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, pagar, loadingCart: loading }}>
            {children}
        </CartContext.Provider>
    );
};
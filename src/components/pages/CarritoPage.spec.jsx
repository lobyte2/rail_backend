import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

import CarritoPage from './CarritoPage.jsx';
import { CartContext } from '../../context/CartContext.jsx';

import { AuthContext } from '../../context/AuthContext.jsx';


const renderCart = (cartValue) => {

    const authContextValue = { user: null, logout: vi.fn() }; 

    return render(
        <BrowserRouter>

            <AuthContext.Provider value={authContextValue}>
                <CartContext.Provider value={cartValue}>
                    <CarritoPage />
                </CartContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    );
};

describe('Componente CarritoPage', () => {


    it('debería mostrar "Tu carrito está vacío" si el contexto no tiene items', () => {

        const emptyCart = {
            cart: [],
            removeFromCart: vi.fn()
        };
        
        renderCart(emptyCart);


        expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument();
        expect(screen.getByText('Ver productos')).toBeInTheDocument();
    });
});
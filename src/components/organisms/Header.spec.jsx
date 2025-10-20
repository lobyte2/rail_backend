import React from 'react';import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom'; 
import Header from './Header.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import { CartContext } from '../../context/CartContext.jsx';
import { vi } from 'vitest';


describe('Componente Header', () => {


    const renderHeader = (authContextValue) => {
        const cartContextValue = { cart: [] };

        return render(
            <BrowserRouter>
                <AuthContext.Provider value={authContextValue}>
                    <CartContext.Provider value={cartContextValue}>
                        <Header />
                    </CartContext.Provider>
                </AuthContext.Provider>
            </BrowserRouter>
        );
    };


    it('debería mostrar "Admin" y "Cerrar Sesión" si el usuario es administrador', () => {

        const mockAuthValue = {
            user: { email: 'admin@test.com', role: 'admin' },
            logout: vi.fn()
        };
        
        renderHeader(mockAuthValue);


        expect(screen.getByText('Admin')).toBeInTheDocument();
 
        expect(screen.getByText('Cerrar Sesión')).toBeInTheDocument();

        expect(screen.queryByText('Iniciar Sesión')).not.toBeInTheDocument();
    });


    it('debería mostrar "Iniciar Sesión" si no hay usuario (usuario es null)', () => {

        const mockAuthValue = {
            user: null
        };

        renderHeader(mockAuthValue);


        expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();

        expect(screen.queryByText('Admin')).not.toBeInTheDocument();
        expect(screen.queryByText('Cerrar Sesión')).not.toBeInTheDocument();
    });
});
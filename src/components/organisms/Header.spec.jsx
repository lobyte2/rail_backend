import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom'; // Necesario por los <Link>
import Header from './Header.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import { CartContext } from '../../context/CartContext.jsx';
import { vi } from 'vitest';

// 'describe' agrupa las pruebas del Header
describe('Componente Header', () => {

    // --- Función auxiliar para renderizar el Header con sus dependencias (Contextos y Router) ---
    // Esto es clave para probar componentes complejos
    const renderHeader = (authContextValue) => {
        const cartContextValue = { cart: [] }; // Un carrito vacío para la prueba

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

    // --- Prueba de Estado / Renderizado Condicional (Puntos 3 y 1b de la pauta) ---
    it('debería mostrar "Admin" y "Logout" si el usuario es administrador', () => {
        // 1. PREPARAR: Definimos un "estado" simulado de admin
        const mockAuthValue = {
            user: { email: 'admin@test.com', role: 'admin' },
            logout: vi.fn()
        };
        
        renderHeader(mockAuthValue);

        // 3. VERIFICAR: Esperamos que los elementos específicos de admin estén visibles
        expect(screen.getByText('Admin')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
        // Y verificamos que "Iniciar Sesión" NO esté
        expect(screen.queryByText('Iniciar Sesión')).not.toBeInTheDocument();
    });

    // --- Prueba de Estado / Renderizado Condicional (Puntos 3 y 1b de la pauta) ---
    it('debería mostrar "Iniciar Sesión" si no hay usuario (usuario es null)', () => {
        // 1. PREPARAR: Definimos un "estado" de usuario no logueado
        const mockAuthValue = {
            user: null
        };

        renderHeader(mockAuthValue);

        // 3. VERIFICAR: Esperamos que se muestre el login
        expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
        // Y verificamos que "Admin" y "Logout" NO estén
        expect(screen.queryByText('Admin')).not.toBeInTheDocument();
        expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });
});
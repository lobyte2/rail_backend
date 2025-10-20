import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

import EntrarPage from './EntrarPage.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';

import { CartContext } from '../../context/CartContext.jsx'; 


vi.mock('../../api/db.js', () => ({
  loginUser: vi.fn(),
}));


const renderLoginPage = () => {
    const loginSpy = vi.fn();

    const cartContextValue = { cart: [] }; 

    return render(
        <BrowserRouter>
            <AuthContext.Provider value={{ login: loginSpy }}>

                <CartContext.Provider value={cartContextValue}>
                    <EntrarPage />
                </CartContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    );
};

describe('Componente EntrarPage', () => {


    it('debería actualizar el estado al escribir en los inputs', () => {
        renderLoginPage();
        
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Contraseña');

        fireEvent.change(emailInput, { target: { value: 'test@user.com' } });
        fireEvent.change(passwordInput, { target: { value: 'pass123' } });

        expect(emailInput.value).toBe('test@user.com');
        expect(passwordInput.value).toBe('pass123');
    });


    it('debería mostrar un enlace para registrarse', () => {
        renderLoginPage();

        const registerLink = screen.getByText('Regístrate aquí');
        
        expect(registerLink).toBeInTheDocument();
        expect(registerLink.tagName).toBe('A');
    });
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

import ProductCard from './Producto.jsx';
import { CartContext } from '../../context/CartContext.jsx';


const mockProduct = {
    id: 1,
    name: 'Roro Viper Ultimate',
    price: 79.99,
    image: 'https://via.placeholder.com/400x300.png?text=Roro+Viper'
};


const renderWithProviders = (addToCartSpy) => {
    return render(
        <BrowserRouter>
            <CartContext.Provider value={{ addToCart: addToCartSpy }}>
                <ProductCard product={mockProduct} />
            </CartContext.Provider>
        </BrowserRouter>
    );
};

describe('Componente ProductCard', () => {


    it('debería renderizar la información del producto (props)', () => {
        const spy = vi.fn();
        renderWithProviders(spy);


        expect(screen.getByText('Roro Viper Ultimate')).toBeInTheDocument();
        expect(screen.getByText('$80')).toBeInTheDocument();
    });


    it('debería llamar a addToCart al hacer clic en el botón', () => {

        const addToCartSpy = vi.fn();
        renderWithProviders(addToCartSpy);


        fireEvent.click(screen.getByText('Añadir al Carrito'));


        expect(addToCartSpy).toHaveBeenCalledWith(mockProduct);
    });
});
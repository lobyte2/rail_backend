import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

import Button from './Button.jsx';


describe('Componente Button', () => {

    it('debería renderizar correctamente el texto (children)', () => {
        render(<Button>Click Me</Button>);
        
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });


    it('debería aplicar la clase de variante "secondary"', () => {

        render(<Button variant="secondary">Cancelar</Button>);
        

        const buttonElement = screen.getByText('Cancelar');
        expect(buttonElement).toHaveClass('btn secondary');
    });


    it('debería llamar a la función onClick cuando se hace clic', () => {

        const handleClickSpy = vi.fn();
        

        render(<Button onClick={handleClickSpy}>Click Me</Button>);


        fireEvent.click(screen.getByText('Click Me'));


        expect(handleClickSpy).toHaveBeenCalled();
    });
});
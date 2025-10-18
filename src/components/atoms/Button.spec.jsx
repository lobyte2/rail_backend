import React from 'react';
// Importamos 'render' y 'screen' para mostrar el componente y buscar elementos.
// 'fireEvent' es para simular interacciones (como clics).
import { render, screen, fireEvent } from '@testing-library/react';
// Importamos los "matchers" de jest-dom para tener verificadores útiles como .toBeInTheDocument()
import '@testing-library/jest-dom';
import { vi } from 'vitest';

import Button from './Button.jsx';

// 'describe' agrupa un conjunto de pruebas (una "suite")
describe('Componente Button', () => {

    // --- Prueba de Renderizado (Punto 1 de la pauta) ---
    // 'it' define una prueba individual (una "especificación")
    it('debería renderizar correctamente el texto (children)', () => {
        // 1. PREPARAR (Arrange): Renderizamos el componente
        render(<Button>Click Me</Button>);
        
        // 2. ACTUAR (Act): (No aplica aquí, solo verificamos renderizado)

        // 3. VERIFICAR (Assert): Esperamos que el texto "Click Me" esté en el documento
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    // --- Prueba de Propiedades (Props) (Punto 2 de la pauta) ---
    it('debería aplicar la clase de variante "secondary"', () => {
        // 1. PREPARAR: Renderizamos el componente pasándole una prop 'variant'
        render(<Button variant="secondary">Cancelar</Button>);
        
        // 3. VERIFICAR: Esperamos que el botón tenga la clase CSS correcta
        const buttonElement = screen.getByText('Cancelar');
        expect(buttonElement).toHaveClass('btn secondary');
    });

    // --- Prueba de Eventos (Punto 4 de la pauta) ---
    it('debería llamar a la función onClick cuando se hace clic', () => {
        // 1. PREPARAR: Creamos una "función espía" de Jasmine
        const handleClickSpy = vi.fn();
        
        // Renderizamos el botón pasándole el espía como prop
        render(<Button onClick={handleClickSpy}>Click Me</Button>);

        // 2. ACTUAR: Simulamos un clic en el botón
        fireEvent.click(screen.getByText('Click Me'));

        // 3. VERIFICAR: Esperamos que nuestra función espía haya sido llamada
        expect(handleClickSpy).toHaveBeenCalled();
    });
});
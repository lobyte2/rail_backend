// Capa de Servicio: Lógica de negocio para el carrito.
import carritos from '../data/db.js';

// Función interna para crear un carrito vacío si no existe
const asegurarCarrito = (usuarioId) => {
    if (!carritos[usuarioId]) {
        carritos[usuarioId] = [];
    }
    return carritos[usuarioId];
};

export const obtenerCarrito = (usuarioId) => {
    return asegurarCarrito(usuarioId);
};

export const agregarItem = (usuarioId, producto) => {
    const carrito = asegurarCarrito(usuarioId);
    // El frontend nos envía el objeto producto completo
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        productoExistente.quantity += 1;
    } else {
        // El frontend espera la propiedad 'quantity'
        carrito.push({ ...producto, quantity: 1 });
    }
    return carrito;
};

export const eliminarItem = (usuarioId, productoId) => {
    const carrito = asegurarCarrito(usuarioId);
    const idNumerico = parseInt(productoId);
    carritos[usuarioId] = carrito.filter(item => item.id !== idNumerico);
    return carritos[usuarioId];
};
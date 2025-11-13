// Capa de Controlador: Maneja las peticiones HTTP (req, res).
import * as servicioProducto from '../services/product.service.js';

export const obtenerTodosLosProductos = (req, res) => {
    const todosLosProductos = servicioProducto.obtenerTodos();
    res.json(todosLosProductos);
};

export const obtenerProductoPorId = (req, res) => {
    const producto = servicioProducto.obtenerPorId(req.params.id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

export const crearProducto = (req, res) => {
    const nuevoProducto = servicioProducto.crear(req.body);
    res.status(201).json(nuevoProducto);
};
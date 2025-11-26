// Capa de Rutas: Define los endpoints para productos.
import { Router } from 'express';
import {
    obtenerTodosLosProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from '../controllers/product.controller.js';

const router = Router();

router.get('/', obtenerTodosLosProductos);
router.get('/:id', obtenerProductoPorId);
router.post('/', crearProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);

export default router;
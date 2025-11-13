// Capa de Rutas: Define los endpoints para productos.
import { Router } from 'express';
import { obtenerTodosLosProductos, obtenerProductoPorId, crearProducto } from '../controllers/product.controller.js';

const router = Router();

router.get('/', obtenerTodosLosProductos);
router.get('/:id', obtenerProductoPorId);
router.post('/', crearProducto);

export default router;
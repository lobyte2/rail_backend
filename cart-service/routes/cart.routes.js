import { Router } from 'express';
import {
    obtenerCarritoUsuario,
    agregarItemAlCarrito,
    eliminarItemDelCarrito,
    checkout // <--- Importar
} from '../controllers/cart.controller.js';

const router = Router();

router.get('/', obtenerCarritoUsuario);
router.post('/itemlo', agregarItemAlCarrito);
router.delete('/itemlo/:id', eliminarItemDelCarrito);
router.post('/checkout', checkout); // <--- Nuevo Endpoint (Finalizar Compra)

export default router;
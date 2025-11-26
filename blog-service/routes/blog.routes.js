// Capa de Rutas: Define los endpoints para el blog.
import { Router } from 'express';
import { obtenerTodosLosPosteos } from '../controllers/blog.controller.js';

const router = Router();

// GET /api/blog/posteos
router.get('/posteos', obtenerTodosLosPosteos);

export default router;
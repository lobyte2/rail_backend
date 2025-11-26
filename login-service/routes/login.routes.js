// Capa de Rutas: Define los endpoints para login/registro.
import { Router } from 'express';
import { manejarLogin, manejarRegistro } from '../controllers/login.controller.js';

const router = Router();

router.post('/login', manejarLogin);
router.post('/register', manejarRegistro);

export default router;
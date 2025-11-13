// Capa de Controlador: Maneja las peticiones HTTP (req, res).
import * as servicioLogin from '../services/login.service.js';

export const manejarLogin = (req, res) => {
    try {
        const sesionUsuario = servicioLogin.autenticar(req.body);
        res.json(sesionUsuario);
    } catch (error) {
        res.status(401).json(error.message); // 401: No autorizado
    }
};

export const manejarRegistro = (req, res) => {
    try {
        const nuevaSesion = servicioLogin.registrar(req.body);
        res.status(201).json(nuevaSesion); // 201: Creado
    } catch (error) {
        res.status(400).json(error.message); // 400: Petición incorrecta
    }
};
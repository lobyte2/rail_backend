// Capa de Controlador: Maneja las peticiones HTTP (req, res).
import * as servicioBlog from '../services/blog.service.js';

export const obtenerTodosLosPosteos = (req, res) => {
    const todosLosPosteos = servicioBlog.obtenerTodos();
    res.json(todosLosPosteos);
};
// Capa de Servicio: Lógica de negocio para el blog.
import posteos from '../data/db.js';

export const obtenerTodos = () => {
    return posteos;
};
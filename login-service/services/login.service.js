// Capa de Servicio: Lógica de negocio para autenticación.
import usuarios from '../data/db.js';

export const autenticar = ({ email, password }) => {
    if (!password || password.length < 5 || password.length > 15) {
        throw new Error('La contraseña debe tener entre 5 y 15 caracteres');
    }

    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if (usuario) {
        // Devolvemos solo lo que el frontend necesita para la sesión
        return { id: usuario.id, email: usuario.email, role: usuario.role };
    } else {
        throw new Error('Credenciales inválidas');
    }
};

export const registrar = (datosUsuario) => {
    const { email, password, fullName, phone, region } = datosUsuario;

    if (!password || password.length < 5 || password.length > 15) {
        throw new Error('La contraseña debe tener entre 5 y 15 caracteres');
    }
    if (usuarios.some(u => u.email === email)) {
        throw new Error('El correo ya está registrado');
    }

    const nuevoUsuario = {
        id: usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
        email, password, role: 'user', fullName,
        phone: phone || 'No especificado', region,
    };

    usuarios.push(nuevoUsuario);
    // Devolvemos la nueva sesión
    return { id: nuevoUsuario.id, email: nuevoUsuario.email, role: nuevoUsuario.role };
};
import productos from '../data/db.js';

export const obtenerTodos = () => {
    return productos;
};

export const obtenerPorId = (id) => {
    const producto = productos.find(p => p.id === parseInt(id));
    return producto;
};

// 'datosProducto' vendrá con { name, price, image, description }
export const crear = (datosProducto) => {
    const nuevoProducto = {
        id: productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1,
        // Leemos las propiedades en inglés que manda el frontend
        name: datosProducto.name,
        price: parseFloat(datosProducto.price),
        image: datosProducto.image,
        description: datosProducto.description,
    };
    productos.push(nuevoProducto);
    return nuevoProducto;
};
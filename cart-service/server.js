import express from 'express';
import cors from 'cors';
import rutasCarrito from './routes/cart.routes.js';

const app = express();
const PORT = 3004;

app.use(cors());
app.use(express.json());

// Rutas relativas a /api/cart (definido en el Gateway)
app.use('/', rutasCarrito);

app.listen(PORT, () => {
    console.log(`Servicio de Carrito corriendo en http://localhost:${PORT}`);
});
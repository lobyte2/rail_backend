import express from 'express';
import cors from 'cors';
import rutasProducto from './routes/product.routes.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Las rutas aquí son relativas a /api/products (definido en el Gateway)
app.use('/', rutasProducto);

app.listen(PORT, () => {
    console.log(`Servicio de Productos corriendo en http://localhost:${PORT}`);
});
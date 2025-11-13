import express from 'express';
import cors from 'cors';
import rutasBlog from './routes/blog.routes.js';

const app = express();
const PORT = 3005;

app.use(cors());
app.use(express.json());

// Rutas relativas a /api/blog (definido en el Gateway)
app.use('/', rutasBlog);

app.listen(PORT, () => {
    console.log(`Servicio de Blog corriendo en http://localhost:${PORT}`);
});
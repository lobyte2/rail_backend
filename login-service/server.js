import express from 'express';
import cors from 'cors';
import rutasLogin from './routes/login.routes.js';

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

// Rutas relativas a /api/login (definido en el Gateway)
app.use('/', rutasLogin);

app.listen(PORT, () => {
    console.log(`Servicio de Login corriendo en http://localhost:${PORT}`);
});
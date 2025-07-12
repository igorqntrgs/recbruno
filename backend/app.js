const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const authRoutes = require('./auth/authRoutes');
const verifyToken = require('./auth/verifyToken');
const livroRoutes = require('./routes/livroRoutes');
const reservaRoutes = require('./routes/reservaRoutes.js');
require('dotenv').config();

app.use(express.json());

// Rota pública de login
app.use('/api/login', authRoutes);

// Rotas protegidas
app.use('/api/livros', verifyToken, livroRoutes);
app.use('/api/reservas', verifyToken, reservaRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3001}`);
});
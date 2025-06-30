// server/routes.js
const express = require('express');
const router = express.Router();
const db = require('./db');

// cadastro de conta (exemplo básico)
router.post('/api/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const sql = 'INSERT INTO usuarios (first_name, last_name, email, senha) VALUES (?, ?, ?, ?)';
  db.query(sql, [firstName, lastName, email, password], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao cadastrar' });
    res.status(200).json({ message: 'Usuário cadastrado com sucesso' });
  });
});

// outras rotas aqui futuramente...

module.exports = router;

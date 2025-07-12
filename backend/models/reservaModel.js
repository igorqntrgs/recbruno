const db = require('../config/db');

const Reserva = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM reservas', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  create: ({ usuario, livro, dataReserva, dataDevolucao, observacoes }) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO reservas (usuario, livro, dataReserva, dataDevolucao, observacoes) VALUES (?, ?, ?, ?, ?)';
      const values = [usuario, livro, dataReserva, dataDevolucao, observacoes];
      db.query(query, values, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  update: (id, { usuario, livro, dataReserva, dataDevolucao, observacoes }) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE reservas SET usuario = ?, livro = ?, dataReserva = ?, dataDevolucao = ?, observacoes = ? WHERE id = ?';
      const values = [usuario, livro, dataReserva, dataDevolucao, observacoes, id];
      db.query(query, values, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM reservas WHERE id = ?', [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
};

module.exports = Reserva;
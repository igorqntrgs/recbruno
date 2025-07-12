const db = require('../config/db');

const Livro = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM livros', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  create: (titulo) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO livros (titulo) VALUES (?)', [titulo], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  update: (id, titulo) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE livros SET titulo = ? WHERE id = ?', [titulo, id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM livros WHERE id = ?', [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
};

module.exports = Livro;
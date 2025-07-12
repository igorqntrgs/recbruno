const Livro = require('../models/livroModel');

exports.getAll = async (req, res) => {
  try {
    const livros = await Livro.getAll();
    res.json(livros);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar livros', error });
  }
};

exports.create = async (req, res) => {
  const { titulo } = req.body;
  if (!titulo) return res.status(400).json({ message: 'Título é obrigatório' });

  try {
    const result = await Livro.create(titulo);
    res.status(201).json({ message: 'Livro cadastrado', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar livro', error });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { titulo } = req.body;
  if (!titulo) return res.status(400).json({ message: 'Título é obrigatório' });

  try {
    await Livro.update(id, titulo);
    res.json({ message: 'Livro atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar livro', error });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    await Livro.remove(id);
    res.json({ message: 'Livro removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover livro', error });
  }
};
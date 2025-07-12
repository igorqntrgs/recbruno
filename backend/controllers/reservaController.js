const Reserva = require('../models/reservaModel');

exports.getAll = async (req, res) => {
  try {
    const reservas = await Reserva.getAll();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar reservas', error });
  }
};

exports.create = async (req, res) => {
  const { usuario, livro, dataReserva, dataDevolucao, observacoes } = req.body;
  if (!usuario || !livro || !dataReserva || !dataDevolucao) {
    return res.status(400).json({ message: 'Campos obrigatórios não preenchidos' });
  }

  try {
    const result = await Reserva.create({ usuario, livro, dataReserva, dataDevolucao, observacoes });
    res.status(201).json({ message: 'Reserva criada', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar reserva', error });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { usuario, livro, dataReserva, dataDevolucao, observacoes } = req.body;

  try {
    await Reserva.update(id, { usuario, livro, dataReserva, dataDevolucao, observacoes });
    res.json({ message: 'Reserva atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar reserva', error });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    await Reserva.remove(id);
    res.json({ message: 'Reserva cancelada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cancelar reserva', error });
  }
};
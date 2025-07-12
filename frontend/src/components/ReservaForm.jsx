import React, { useState } from 'react';
import { createReserva } from '../api';

export default function ReservaForm({ onAdd }) {
  const [usuario, setUsuario] = useState('');
  const [livro, setLivro] = useState('');
  const [dataReserva, setDataReserva] = useState('');
  const [dataDevolucao, setDataDevolucao] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReserva({ usuario, livro, dataReserva, dataDevolucao, observacoes });
    setUsuario(''); setLivro(''); setDataReserva(''); setDataDevolucao(''); setObservacoes('');
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reservar Livro</h2>
      <input type="text" placeholder="Usuário" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
      <input type="text" placeholder="Título do Livro" value={livro} onChange={(e) => setLivro(e.target.value)} required />
      <input type="date" value={dataReserva} onChange={(e) => setDataReserva(e.target.value)} required />
      <input type="date" value={dataDevolucao} onChange={(e) => setDataDevolucao(e.target.value)} required />
      <textarea placeholder="Observações" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />
      <button type="submit">Reservar</button>
    </form>
  );
}

import React, { useState } from 'react';
import { createLivro } from '../api';

export default function LivroForm({ onAdd }) {
  const [titulo, setTitulo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    await createLivro({ titulo });
    setTitulo('');
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Livro</h2>
      <input
        type="text"
        placeholder="Título do livro"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}

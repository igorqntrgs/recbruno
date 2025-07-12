import React, { useEffect, useState } from 'react';
import { getLivros, deleteLivro } from '../api';

export default function ListaLivros() {
  const [livros, setLivros] = useState([]);

  const fetchLivros = async () => {
    const res = await getLivros();
    setLivros(res.data);
  };

  const handleDelete = async (id) => {
    await deleteLivro(id);
    fetchLivros();
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  return (
    <div>
      <h2>Livros Cadastrados</h2>
      <ul>
        {livros.map((livro) => (
          <li key={livro.id}>
            {livro.titulo}
            <button onClick={() => handleDelete(livro.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { getReservas, deleteReserva } from '../api';

export default function ListaReservas() {
  const [reservas, setReservas] = useState([]);

  const fetchReservas = async () => {
    const res = await getReservas();
    setReservas(res.data);
  };

  const handleDelete = async (id) => {
    await deleteReserva(id);
    fetchReservas();
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  return (
    <div>
      <h2>Reservas Ativas</h2>
      <ul>
        {reservas.map((res) => (
          <li key={res.id}>
            <strong>{res.usuario}</strong> reservou <em>{res.livro}</em><br />
            de {res.dataReserva} até {res.dataDevolucao}
            {res.observacoes && (<p>Obs: {res.observacoes}</p>)}
            <button onClick={() => handleDelete(res.id)}>Cancelar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
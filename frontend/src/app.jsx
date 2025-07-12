import React from 'react';
import LivroForm from './components/LivroForm';
import ListaLivros from './components/ListaLivros';
import ReservaForm from './components/ReservaForm';
import ListaReservas from './components/ListaReserva';

export default function App() {
  const [refresh, setRefresh] = React.useState(false);

  const handleRefresh = () => setRefresh(prev => !prev);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📚 Biblioteca Comunitária</h1>

      <section>
        <LivroForm onAdd={handleRefresh} />
        <ListaLivros key={refresh} />
      </section>

      <hr />

      <section>
        <ReservaForm onAdd={handleRefresh} />
        <ListaReservas key={refresh + 'r'} />
      </section>
    </div>
  );
}

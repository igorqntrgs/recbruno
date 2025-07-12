import React, { useState } from 'react';
import { login } from '../api'; // <- corrigido aqui
import { saveToken } from '../auth';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [erro, setErro] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await login(form); // <- corrigido aqui
      console.log('Token recebido:', res.data.token);
      saveToken(res.data.token);
      console.log('Token salvo:', localStorage.getItem('token'));
      onLogin();
    } catch (err) {
      setErro('Usuário ou senha inválidos');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="username" placeholder="Usuário" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Senha" onChange={handleChange} required />
      <button type="submit">Entrar</button>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </form>
  );
}

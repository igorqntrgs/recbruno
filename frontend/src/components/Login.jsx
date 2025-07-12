import React, { useState } from 'react';
import api from '../api';
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
      const res = await api.post('/login', form);
      saveToken(res.data.token);
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
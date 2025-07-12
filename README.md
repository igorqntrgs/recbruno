# 📅 Sistema de Agendamento para Barbearia

Este projeto fullstack permite que uma barbearia gerencie agendamentos de forma prática, com autenticação de administrador, visualização, criação, edição e exclusão de compromissos.

---

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js, Express.js, MySQL, JWT
- **Frontend**: React, Axios, localStorage
- **Outros**: Docker (MySQL), REST API

---

## 🚀 Como Rodar o Projeto

```bash
# Clonar e entrar na pasta do projeto
cd backend
npm install
node app.js &
docker-compose up

cd ../frontend
npm install
npm start
```

---

## 📌 Funcionalidades

- Login com token JWT
- Cadastro, listagem, edição e exclusão de agendamentos
- Validação de sessão e logout

---

## ✅ Respostas Técnicas

### a) Estrutura da Aplicação (FE + BE)
A aplicação é dividida em duas camadas:
- **Frontend** (React): responsável pela interface, autenticação e interação com a API
- **Backend** (Express + MySQL): responsável pelas regras de negócio, persistência dos dados e segurança via JWT

### b) Rotas RESTful no Backend
- `POST /api/login` – autenticação e geração do token
- `GET /api/agendamentos` – listar todos os agendamentos
- `POST /api/agendamentos` – criar novo agendamento
- `PUT /api/agendamentos/:id` – editar um agendamento existente
- `DELETE /api/agendamentos/:id` – excluir um agendamento

### c) Componentes React Criados
- `<Login />`: tela de autenticação
- `<AgendamentoForm />`: formulário para cadastro e edição
- `<AgendamentoList />`: listagem dos agendamentos com botões de editar/excluir

### d) [Diferencial] Login com JWT
A autenticação JWT foi implementada com:
- Geração de token via `jsonwebtoken`
- Armazenamento no `localStorage`
- Proteção das rotas com middleware `verifyToken`
- Interceptação de requisições no frontend com `axios` para anexar o token automaticamente

### e) [Diferencial] Microserviços e Mensageria (controle de filas)
Embora este projeto seja monolítico, seria possível migrá-lo para microserviços da seguinte forma:
- Separar o serviço de agendamentos e autenticação em containers distintos
- Utilizar **mensageria com RabbitMQ ou Kafka** para:
  - Enviar notificações por e-mail ou SMS ao cliente
  - Atualizar dashboards em tempo real com workers consumidores
  - Registrar logs ou auditoria em serviços assíncronos

---

## 📄 Script de Banco de Dados
Incluso em `backend/database/init.sql`:

```sql
CREATE DATABASE IF NOT EXISTS barbearia_db;
USE barbearia_db;
CREATE TABLE IF NOT EXISTS agendamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente VARCHAR(255) NOT NULL,
  servico VARCHAR(255) NOT NULL,
  data DATE NOT NULL,
  hora VARCHAR(10) NOT NULL,
  observacoes TEXT
);
```

---

## 📄 Licença
Este projeto é open-source e livre para uso acadêmico ou pessoal.

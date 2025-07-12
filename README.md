# Sistema de reservas de livros para biblioteca comunitária

---

## Correção de erro do Token
No "Login.jsx" subsituí o import da api :"import api from '../api';" por "import { login } from '../api';" e, consequentemente substituí uma linha na constante handleSubmit de "const res = await api.post('/login', form);" para "const res = await login(form);"

---

## Como Rodar o Projeto

```bash
# Clonar e entrar na pasta do projeto
cd backend
npm install
node app.js &
(docker-compose up) - não utilizado

cd ../frontend
npm install
npm start
```

---

## Funcionalidades

- Login com token JWT
- Cadastro, listagem, edição e exclusão de agendamentos
- Validação de sessão e logout

---

## Respostas Técnicas

### a) Estrutura da Aplicação (FE + BE)
A aplicação é dividida em duas camadas:
**Frontend** (React)
Estrutura localizada na pasta frontend/src

Componentes principais dentro de src/components:

Login.jsx, LivroForm.jsx, ListaLivros.jsx, ReservaForm.jsx, ListaReserva.jsx

Gerenciamento de autenticação com auth.js

Comunicação com backend centralizada em api.js, que utiliza axios

Token JWT armazenado em localStorage e automaticamente incluído nos headers das requisições via interceptor

**Backend** (Node.js + Express + MySQL)
Estrutura organizada nas pastas routes, controllers, models, auth

Banco de dados MySQL gerenciado via container Docker (com init.sql)

Arquivo .env define porta e credenciais do banco

Proteção de rotas com verifyToken.js

Login baseado em um usuário administrador fixo com bcryptjs e jsonwebtoken

### b) Rotas RESTful no Backend
 **Livros** (/api/livros)
- GET /api/livros – listar todos os livros

- POST /api/livros – cadastrar novo livro

- PUT /api/livros/:id – editar informações de um livro

- DELETE /api/livros/:id – excluir livro

**Reservas** (/api/reservas)
- GET /api/reservas – listar todas as reservas

- POST /api/reservas – criar nova reserva

- PUT /api/reservas/:id – editar uma reserva (ex: prorrogar devolução)

- DELETE /api/reservas/:id – cancelar reserva (remover)

**Autenticação** (/api/login)
- POST /api/login – login com verificação e retorno de JWT

### c) Componentes React Criados
<Login />
Tela de autenticação. Captura nome de usuário e senha, realiza login e salva o token JWT no localStorage.

<LivroForm />
Formulário para cadastrar ou editar livros. Integra com a API e realiza POST/PUT conforme o caso.

<ListaLivros />
Lista todos os livros cadastrados com opções de edição e exclusão.

<ReservaForm />
Formulário para realizar ou editar uma reserva, vinculando um livro e um usuário.

<ListaReserva />
Lista todas as reservas realizadas, com opções de editar (ex: prorrogar) ou cancelar.

### d) [Diferencial] Login com JWT
A autenticação foi implementada com:

- Geração do token JWT no backend com jsonwebtoken

- Armazenamento seguro no frontend via localStorage

- Proteção das rotas backend com verifyToken.js, validando o token a cada requisição

- Interceptação de requisições via axios.interceptors no frontend para enviar o token automaticamente no header Authorization

### e) [Diferencial] Microserviços e Mensageria (controle de filas)
Não foi implementado como microserviços mas como monolito.

---

## Script de Banco de Dados
Incluso em `backend/database/init.sql`:
```sql
CREATE DATABASE IF NOT EXISTS livraria;
USE livraria;

CREATE TABLE IF NOT EXISTS livros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(255) NOT NULL,
  livro VARCHAR(255) NOT NULL,
  dataReserva DATE NOT NULL,
  dataDevolucao DATE NOT NULL,
  observacoes TEXT
);
```

## Variáveis de Ambiente
### `.env` no Backend:
```
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=livraria
JWT_SECRET=chave-secreta-super-segura
```

### `.env` no Frontend:
```
REACT_APP_API_URL=http://localhost:3001/api
```

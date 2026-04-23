# 🧩 Pokémon RPG System

Sistema de RPG inspirado em Pokémon, com gerenciamento de usuários, fichas de Pokémon, inventário e permissões.

---

## 📌 Status do projeto

🚧 Em desenvolvimento

✅ Backend base funcional
✅ Sistema de autenticação implementado
🚧 Modelagem das regras do jogo em andamento

---

## 👨‍💻 Autor

Desenvolvido por **Rafael Crempe**

---

## 🚀 Tecnologias utilizadas

### Backend

* **Node.js**
* **Fastify**
* **TypeScript**
* **Prisma ORM**
* **PostgreSQL**
* **JWT** (autenticação)
* **Bcrypt** (hash de senha)
* **Zod** (validação futura)

### Infraestrutura

* **Docker**
* **Docker Compose**

---

## 📁 Estrutura atual do projeto

```txt
src/
├── controllers/
├── routes/
├── middlewares/
├── lib/
├── server.ts
```

---

## ⚙️ Configuração do ambiente

### 1. Clone o repositório

```bash
git clone <url-do-repo>
cd pokemon-rpg/backend
```

---

### 2. Instale as dependências

```bash
npm install
```

---

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do backend:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pokemon_rpg"
JWT_SECRET="supersecret"
```

---

### 4. Suba o banco de dados (Docker)

```bash
docker compose up -d
```

ou:

```bash
docker-compose up -d
```

---

### 5. Execute as migrations

```bash
npx prisma migrate dev
```

---

### 6. Inicie o servidor

```bash
npm run dev
```

Servidor padrão:

```txt
http://localhost:3333
```

---

## 🌐 Rotas disponíveis

### 🔹 Teste da API

```http
GET /
```

Resposta:

```json
{
  "message": "API funcionando"
}
```

---

### 🔹 Teste de conexão com banco

```http
GET /test-db
```

---

### 🔹 Criar usuário

```http
POST /users
```

Body:

```json
{
  "name": "Name",
  "lastName": "LastName",
  "username": "user1",
  "email": "user1@email.com",
  "password": "123456"
}
```

---

### 🔹 Login

```http
POST /login
```

Body:

```json
{
  "username": "user1",
  "password": "123456"
}
```

Resposta:

```json
{
  "message": "Login realizado com sucesso.",
  "token": "jwt_token",
  "user": {
    "id": "...",
    "username": "user1",
    "role": "PLAYER"
  }
}
```

---


## 🔐 Sistema de autenticação

### Implementado

* Cadastro de usuários
* Login com username + senha
* Hash de senha com bcrypt
* JWT Token
* Middleware de proteção de rotas

### Roles disponíveis

* `ADMIN`
* `PLAYER`
* `NPC`

---

## 🧠 Conceito do sistema

O projeto é dividido em pilares principais:

### 🧬 Dados base (Pokémon)

* Espécies
* Formas
* Tipagens
* Stats base
* Características oficiais

### 📄 Fichas (instâncias)

Cada jogador poderá possuir Pokémon únicos com:

* Nível
* Gênero
* Nature
* Item segurado
* Modificadores temporários
* Modificadores permanentes
* Estado atual

### ⚙️ Engine de regras

Sistema futuro para cálculo automático de:

* HP final
* Atributos
* Buffs / Debuffs
* Influência de nível
* Naturezas
* Regras personalizadas do RPG

---

## 🧩 Funcionalidades concluídas

* [x] Estrutura inicial backend
* [x] Fastify configurado
* [x] Prisma + PostgreSQL
* [x] Docker configurado
* [x] Sistema de usuários
* [x] Cadastro de usuário
* [x] Login com JWT
* [x] Middleware de autenticação

---

## 🚧 Próximas funcionalidades

* [ ] Rota `/me`
* [ ] CRUD de fichas Pokémon
* [ ] Sistema de permissões entre usuários
* [ ] Party principal
* [ ] Inventário
* [ ] Painel ADMIN
* [ ] Frontend React
* [ ] Dashboard do jogador

---

## ⚠️ Observações

* `node_modules/` não é versionado
* `.env` não deve ser commitado
* Use `npx prisma studio` para visualizar dados locais
* Tokens JWT devem permanecer privados

---

## 📌 Objetivo do projeto

Criar uma plataforma completa de RPG inspirado em Pokémon, com foco em organização de fichas, progressão de jogadores, automação de regras e experiência moderna via web.

# 🧩 Pokémon RPG System

Sistema de RPG inspirado em Pokémon, com gerenciamento de fichas, jogadores, inventário e batalhas.

---

## 📌 Status do projeto

🚧 Em desenvolvimento

---

## 👨‍💻 Autor

Desenvolvido por Rafael Crempe


## 🚀 Tecnologias utilizadas

### Backend

* **Node.js**
* **Fastify**
* **TypeScript**
* **Prisma ORM**
* **PostgreSQL**
* **JWT** (autenticação)
* **Zod** (validação)

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
docker-compose up -d
```

ou (dependendo da versão):

```bash
docker compose up -d
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

---

## 🌐 Rotas de teste

### 🔹 Teste do servidor

```
GET http://localhost:3333/
```

Resposta esperada:

```json
{
  "message": "API rodando 🚀"
}
```

---

### 🔹 Teste de conexão com banco

```
GET http://localhost:3333/test-db
```

---

## 🧠 Conceito do sistema

O sistema é baseado em três pilares principais:

### 🧬 Dados base (Pokémon)

* Espécies e formas
* Stats base
* Tipos e características

---

### 📄 Fichas (instâncias)

* Pokémon pertencentes a jogadores
* Nível, modificadores e estado atual
* Golpes e habilidades

---

### ⚙️ Engine de regras

* Cálculo de atributos
* Influência de nível, natureza e modificadores
* Sistema inspirado em planilha dinâmica

---

## 🔐 Autenticação (planejado)

* Sistema de usuários
* Roles:

  * `ADMIN`
  * `PLAYER`
* Permissões de acesso a fichas

---

## 🧩 Funcionalidades planejadas

* [ ] Sistema de usuários (login/register)
* [ ] Criação de fichas de Pokémon
* [ ] Sistema de permissões
* [ ] Inventário (itens)
* [ ] Time principal (party)
* [ ] Engine de cálculo de atributos
* [ ] Interface em React
* [ ] Sistema de batalha

---

## ⚠️ Observações

* O diretório `node_modules` não é versionado
* O arquivo `.env` não deve ser commitado
* As migrations do Prisma podem ser versionadas futuramente

---



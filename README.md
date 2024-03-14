# Projeto de API Express com MongoDB

Este é um projeto de API construído com Express.js e MongoDB para criar e gerenciar usuários e postagens.

## Pré-requisitos

Certifique-se de ter o Node.js e o MongoDB instalados em sua máquina.

## Configuração

1. Clone o repositório:

```
git clone https://github.com/seu-usuario/seu-projeto.git
```

2. Instale as dependecias:
```
npm i
```


## Uso

Para iniciar o servidor, execute:

```
npm start
```

O servidor estará disponível em `http://localhost:3001`.

## Rotas

### Autenticação

- `POST /auth/singup`: Registra um novo usuário.
- `POST /auth/login`: Realiza login de usuário.

### Feed

- `GET /feed`: Obtém todas as postagens.
- `POST /feed/post`: Cria uma nova postagem.
- `DELETE /feed/post/:id`: Deleta uma postagem.
- `PATCH /feed/post/:id`: Atualiza uma postagem existente.

### Usuários

- `GET /users`: Obtém todos os usuários.
- `GET /users/:id`: Obtém um usuário específico por ID.
- `PATCH /users/:id`: Atualiza as informações de um usuário.
- `PATCH /users/chengePassword/:id`: Altera a senha de um usuário.
- `DELETE /users/:id`: Deleta um usuário.




# TodoList FullStack

Projeto de desenvolvimento de uma lista de tarefas fullstack.

## Stack utilizada

**Front-end:** HTML5, CSS3 e JavaScript.

**Back-end:** Nodejs, Express e CORS.
## Deploy

1. **Atenção para criar seu próprio arquivo para conexão com o banco de dados _.env_ seguindo o padrão do arquivo _.env.example._**
```mysql
PORT = 
MYSQL_HOST = 
MYSQL_USER = 
MYSQL_PASSWORD = 
MYSQL_DB = 
```
2. Rodar aplicação 
```bash
 -cd backend
 -npm install
 -npm start
```

## Documentação da API

#### Retornar lista de tarefas

```http
  GET localhost:3333/tasks
```

#### Adicionar uma tarefa
```http
  POST localhost:3333/tasks
```

#### Deletar uma tarefa
```http
  POST localhost:3333/tasks/${id}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | O ID da tarefa a ser removida |

#### Atualizar uma tarefa
```http
  PUT localhost:3333/tasks/${id}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | O ID da tarefa a ser atualizada |




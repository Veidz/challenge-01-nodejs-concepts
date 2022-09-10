const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  // Complete aqui
}

function handleUserFields(request, response, next) {
  const { name, username } = request.body
  if (!name || !username) {
    return response.status(400).json({ error: 'Invalid data provided' })
  }
  next()
}

app.post('/users', handleUserFields, (request, response) => {
  const { name, username } = request.body

  const createdUser = {
    id: uuidv4(),
    name,
    username,
    todos: []
  }

  const userAlreadyExists = users.some((user) => user.username === username)
  if (userAlreadyExists) {
    return response.status(400).json({ error: 'User already exists' })
  }

  users.push(createdUser)
  return response.status(201).json(createdUser)
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
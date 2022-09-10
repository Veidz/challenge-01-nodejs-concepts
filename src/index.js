const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers
  if (!username) {
    return response.status(400).json({ error: 'No username provided' })
  }

  const userExists = users.some((user) => user.username === username)
  if (!userExists) {
    return response.status(404).json({ error: 'No user found' })
  }

  next()
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
  const { username } = request.headers

  const { todos } = users.find((user) => user.username === username)
  return response.status(200).json(todos)
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body
  const { username } = request.headers

  const createdTodo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }
  
  users.map((user) => {
    if (user.username === username) {
      user.todos.push(createdTodo)
    }
  })

  return response.status(201).json(createdTodo)
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
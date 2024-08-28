// DEPENDENCIES
///////////////////
const express = require('express')
const morgan = require('morgan')

const app = express();
const { PORT = 3000 } = process.env

const todos = [
    {
        title: "My first Todo",
        content: "My first message" 
    }
]

// MIDDLEWARE
///////////////////
app.use(morgan('dev'))

// ROUTES
///////////////////
app.get('/', (req, res) => {
    res.send('Honey im home')
})

// INDEX 
app.get('/todos', (req, res) => {
    res.json(todos)
})

// SHOW
app.get('/todos/:id', (req, res) => {
    let id = parseInt(req.params.id);

    // find our todo based on the request param
    let foundTodo = todos[id]
    // respond with the found todo
    res.json(foundTodo)
})

// LISTENER
///////////////////
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
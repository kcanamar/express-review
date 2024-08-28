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
app.use(express.urlencoded({ extended: false })) // gives us access to req.body from x-www-form-urlencoded

// ROUTES
///////////////////
app.get('/', (req, res) => {
    res.send('Honey im home')
})

// INDEX 
app.get('/todos', (req, res) => {
    res.json(todos)
})

// CREATE
app.post('/todos', (req, res) => {

    // create our new todo from the request body
    let newTodo = {
        title: req.body.title,
        content: req.body.content
    }

    // append our new todo to the todos array
    todos.push(newTodo)

    // then show the new todos
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
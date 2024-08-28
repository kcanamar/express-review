// DEPENDENCIES
///////////////////
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')

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
app.use(methodOverride("_method"))

// app.use((req, res, next) => { ........... next() })

// ROUTES
///////////////////
app.get('/', (req, res) => {
    res.send('Honey im home')
})

// INDEX 
app.get('/todos', (req, res) => {
    res.render('index.ejs', { data: todos })
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
    res.redirect('/todos')
})

// NEW
app.get("/todos/new", (req, res) => {
    res.render('new.ejs')
})

// EDIT
app.get('/todos/edit/:id', (req, res) => {
    // find the todo to edit
    let foundTodo = todos[req.params.id]
    foundTodo.id = req.params.id
    // pass the found todo to the edit page
    res.render('edit.ejs', { data: foundTodo })
})

// UPDATE
app.put('/todos/:id', (req, res) => {
    let updatedTodo = {
        title: req.body.title,
        content: req.body.content
    }

    const id = req.params.id
    // Replace the existing todo with the updated todo
    todos[id] = updatedTodo

    // redirect back to the show route of the updated todo
    res.redirect(`/todos/${id}`)
})
// SHOW
app.get('/todos/:id', (req, res) => {
    let id = parseInt(req.params.id);

    // find our todo based on the request param
    let foundTodo = todos[id]
    foundTodo.id = id
    // respond with the found todo
    res.render('show.ejs', { data: foundTodo })
})

// LISTENER
///////////////////
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
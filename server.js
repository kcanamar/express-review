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

app.get('/todos', (req, res) => {
    res.json(todos)
})

// LISTENER
///////////////////
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
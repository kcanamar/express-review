// DEPENDENCIES
///////////////////
const express = require('express')
const morgan = require('morgan')

const app = express();
const { PORT = 3000 } = process.env

// MIDDLEWARE
///////////////////
app.use(morgan('dev'))

// ROUTES
///////////////////
app.get('/', (req, res) => {
    res.send('Honey im home')
})


// LISTENER
///////////////////
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
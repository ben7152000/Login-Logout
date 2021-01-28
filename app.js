// Modules
const express = require('express')
const exphbs = require('express-handlebars')
const router = require('./routes/index')

// Normal settings
const app = express()
const PORT = 3000

// Express-Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// Setting Router
app.use(router)

// Listening
app.listen(PORT, console.log(`The server is running on localhost${PORT}`))
